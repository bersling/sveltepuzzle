export enum TouchMode {
	SCROLLABLE = 'SCROLLABLE',
	CLICK_ONLY = 'CLICK_ONLY',
	DRAG_ONLY = 'DRAG_ONLY'
}

export interface TouchData {
	pageX: number;
	pageY: number;
	clientX: number;
	clientY: number;
	isScroll: boolean;
	touchMode: TouchMode;
	originPageY: number;
	originPageX: number;
	target?: EventTarget | null; // set this at the beginning to not accidentally switch targets. Required to fix fast mouse based dragging interactions (e.g. match game).
}

export function extractIdentifier(touch: Touch | MouseEvent): number {
	return (touch as any).identifier ?? 0; // set 0 as alternative identifier for mouse events
}

export function extractTouch(e: TouchEvent | MouseEvent): Touch | MouseEvent {
	if ((e as any).changedTouches) {
		return (e as any).changedTouches[0];
	} else {
		return e as MouseEvent;
	}
}

const touchDataMap = new Map<number, { firstTouch: TouchData; lastTouch: TouchData }>();

export const customTouchStart = (touchMode: TouchMode) => (e: TouchEvent) => {
	// For scrollable we don't immediately go to special handlers since the native scroll implementation
	// is smoother than the custom implementation.
	if (touchMode !== TouchMode.SCROLLABLE || e.touches.length > 1) {
		const touch = e.changedTouches[0];

		const firstTouch: TouchData = {
			pageX: touch.pageX,
			pageY: touch.pageY,
			clientX: touch.clientX,
			clientY: touch.clientY,
			isScroll: false,
			originPageX: touch.pageX,
			originPageY: touch.pageY,
			touchMode
		};

		touchDataMap.set(touch.identifier, {
			firstTouch: firstTouch,
			lastTouch: firstTouch
		});

		const touchMoveHandlers: Record<TouchMode, Function> = {
			[TouchMode.SCROLLABLE]: () => {
				// nothing to do
			},
			[TouchMode.DRAG_ONLY]: () => {
				// nothing to do
			},
			[TouchMode.CLICK_ONLY]: () => {
				// nothing to do
			}
		};
		touchMoveHandlers[touchMode]();
	}
};

export const customTouchMove = (e: TouchEvent) => {
	const touch = e.changedTouches[0];
	const touchData = touchDataMap.get(touch.identifier)!;
	const lastTouchData = touchData.lastTouch;
	const newTouchData: TouchData = {
		...lastTouchData,
		clientX: touch.clientX,
		clientY: touch.clientY,
		pageX: touch.pageX,
		pageY: touch.pageY
	};
	if (lastTouchData != null) {
		const touchMoveHandlers: Record<TouchMode, Function> = {
			[TouchMode.SCROLLABLE]: () => {
				if (!lastTouchData.isScroll) {
					const distanceToOriginY = Math.abs(newTouchData.pageY - lastTouchData.originPageY);
					if (distanceToOriginY > 5) {
						newTouchData.isScroll = true;
					}
				}
				const deltaY = newTouchData.pageY - lastTouchData.pageY;
				const scrollableElement = document.getElementById('scrollable') as HTMLElement;
				scrollableElement.scrollBy({ top: -deltaY, left: 0, behavior: 'auto' });
				touchDataMap.set(touch.identifier, {
					...touchData,
					lastTouch: newTouchData
				});
			},
			[TouchMode.DRAG_ONLY]: () => {
				// nothing to do
			},
			[TouchMode.CLICK_ONLY]: () => {
				// nothing to do
				e.preventDefault();
				e.stopPropagation();
			}
		};
		touchMoveHandlers[lastTouchData.touchMode]();
	}
};

function getDistance(x1: number, y1: number, x2: number, y2: number) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export const customTouchEnd = (e: TouchEvent) => {
	const touch = e.changedTouches[0];
	const touchData = touchDataMap.get(touch.identifier)!;
	const lastTouchData = touchData.lastTouch;
	if (lastTouchData != null) {
		function clickTarget() {
			// don't do the default handling
			e.preventDefault();
			e.stopPropagation();

			function handlerOne() {
				// The target on the touch event is where the touch STARTED, not where it ends.
				// Compare this with the element the touch is over at the end to check whether it likely was a click
				const targetStart = touch.target;
				const targetEnd = Array.from(
					document.elementsFromPoint(touch.pageX, touch.pageY)
				)[0] as HTMLElement;
				if (targetStart === targetEnd) {
					const target = targetStart as HTMLElement;
					// Check if there is a click method on the element. If there is, click it.
					// If not, do a custom mouse click event.
					if (typeof target.click === 'function') {
						target.click();
					} else {
						const clickEvent = new MouseEvent('click', {
							view: window,
							bubbles: true,
							cancelable: true
						});
						target.dispatchEvent(clickEvent);
					}
				}
			}

			function handlerTwo() {
				// Check if start and end are reasonably close to each other
				const distance = getDistance(
					touchData.firstTouch.pageX,
					touchData.firstTouch.pageY,
					lastTouchData.pageX,
					lastTouchData.pageY
				);
				if (distance < 10) {
					const target = touch.target as HTMLElement;
					// Check if there is a click method on the element. If there is, click it.
					// If not, do a custom mouse click event.
					if (typeof target.click === 'function') {
						target.click();
					} else {
						const clickEvent = new MouseEvent('click', {
							view: window,
							bubbles: true,
							cancelable: true
						});
						target.dispatchEvent(clickEvent);
					}
				}
			}

			// you can check if one of the handlers feels a bit more natural
			handlerOne();
			// handlerTwo();
		}

		const touchMoveHandlers: Record<TouchMode, Function> = {
			[TouchMode.SCROLLABLE]: () => {
				// check if scrolled, otherwise click the element
				const newTouchData: TouchData = {
					...lastTouchData,
					pageX: touch.pageX,
					pageY: touch.pageY
				};

				if (lastTouchData.isScroll) {
					// nothing to do, was a scrolling and scrolling was already handled in touchmove
				} else {
					clickTarget();
				}
			},
			[TouchMode.DRAG_ONLY]: () => {
				// Drag only has custom touch handlers with preventDefault,
				// for the rest the click handler is applied. This allows that
				// for example the navigation can still be clicked even with multiple fingers
				// on the screen.
				clickTarget();
			},
			[TouchMode.CLICK_ONLY]: () => {
				clickTarget();
			}
		};
		touchMoveHandlers[lastTouchData.touchMode]();

		// important: clean up the data or else you'll have a memory leak...
		touchDataMap.delete(touch.identifier);
	}
};
