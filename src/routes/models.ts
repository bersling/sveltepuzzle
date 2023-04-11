export interface CategoryItem {
	link: string;
	jpg: string | null;
	color: string;
	difficulty?: Difficulty;
	isNonSquare?: boolean;
}

export enum Difficulty {
	TODDLER = 'TODDLER',
	PRESCHOOLER = 'PRESCHOOLER'
}

export enum Category {
	BUBBLES = 'BUBBLES',
	COLORING = 'COLORING',
	MEMORY = 'MEMORY',
	MAZE = 'MAZE',
	MATCH = 'MATCH',
	PUZZLE = 'PUZZLE',
	DIFF = 'DIFF'
}

export enum HueEnum {
	RED = 'RED',
	ORANGE = 'ORANGE',
	YELLOW = 'YELLOW',
	GREEN = 'GREEN',
	BLUE = 'BLUE',
	VIOLET = 'VIOLET',
	PINK = 'PINK'
}

interface HueDefinition {
	id: HueEnum;
	hue: number;
}

const hueMap: Record<HueEnum, HueDefinition> = {
	[HueEnum.RED]: { id: HueEnum.RED, hue: 0 },
	[HueEnum.ORANGE]: { id: HueEnum.ORANGE, hue: 30 },
	[HueEnum.YELLOW]: { id: HueEnum.YELLOW, hue: 50 },
	[HueEnum.GREEN]: { id: HueEnum.GREEN, hue: 125 },
	[HueEnum.BLUE]: { id: HueEnum.BLUE, hue: 225 },
	[HueEnum.VIOLET]: { id: HueEnum.VIOLET, hue: 270 },
	[HueEnum.PINK]: { id: HueEnum.PINK, hue: 300 }
};

export const CATEGORY_HUE_MAP: Record<Category, HueDefinition> = {
	[Category.BUBBLES]: hueMap.RED,
	[Category.COLORING]: hueMap.ORANGE,
	[Category.MEMORY]: hueMap.YELLOW,
	[Category.MAZE]: hueMap.GREEN,
	[Category.MATCH]: hueMap.BLUE,
	[Category.PUZZLE]: hueMap.VIOLET,
	[Category.DIFF]: hueMap.PINK
};

export function hueByCategoryLight(type: Category): string {
	const hueDefinition = CATEGORY_HUE_MAP[type];
	return `hsl(${hueDefinition.hue}, 100%, 70%)`;
}

export interface MemoryItem {
	icon: string;
}

export enum MazeBlockState {
	WALL = 'WALL',
	EMPTY = 'EMPTY',
	PLAYER = 'PLAYER',
	GOAL = 'GOAL'
}

export interface MazeBlock {
	blockState: MazeBlockState;
}

export interface MatchPair {
	question: string;
	answer: string;
}

export enum MatchPairLocation {
	UP = 'UP',
	DOWN = 'DOWN'
}
