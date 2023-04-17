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
	PUZZLE = 'PUZZLE'
}

export enum HueEnum {
	VIOLET = 'VIOLET'
}

interface HueDefinition {
	id: HueEnum;
	hue: number;
}

const hueMap: Record<HueEnum, HueDefinition> = {
	[HueEnum.VIOLET]: { id: HueEnum.VIOLET, hue: 270 }
};

export const CATEGORY_HUE_MAP: Record<Category, HueDefinition> = {
	[Category.PUZZLE]: hueMap.VIOLET
};

export function hueByCategoryLight(type: Category): string {
	const hueDefinition = CATEGORY_HUE_MAP[type];
	return `hsl(${hueDefinition.hue}, 100%, 70%)`;
}
