<script lang="ts">
	import { Category, hueByCategoryLight } from '../models';
	import PaddedPageWithNav from '../PaddedPageWithNav.svelte';
	import { TouchMode } from '../touch';

	const valueBullets = [
		{
			valueTitle: 'Building games:',
			valueDescription: 'Svelte is performant enough to build games!'
		},
		{
			valueTitle: 'Drag & drop:',
			valueDescription:
				"We all know it. The default HTML5 dragdrop api is... not that great. So I've worked on a better drag and drop."
		},
		{
			valueTitle: 'Toddler friendly:',
			valueDescription:
				"It's quite cool to have toddler testers. They do things you'd never expect such as having 4 fingers at the same time on a tablet. The drag and drop accounts for that since the browsers default for handling multi touch is... not very toddler friendly."
		},
		{
			valueTitle: 'AI Art:',
			valueDescription:
				'Might be controversial. But using AI generated art is a fast and easy way to get something cool. All images for the puzzles were generated with Dall-E or midjourney.'
		},
		{
			valueTitle: 'Mobile App:',
			valueDescription:
				"As a web dev, I want to leverage those skills to develop apps, also for iOS and Android. This repo shows how it's done with capacitor. I've also tried tauri mobile alpha, but found capacitor to be more out of the box and good enough for this project!"
		},
		{
			valueTitle: 'DRY:',
			valueDescription:
				"Don't repeat yourself and generate anything repetitive! Check out the soure code."
		}
	];
</script>

<PaddedPageWithNav parent="/" touchMode={TouchMode.SCROLLABLE}>
	<div class="wrapper">
		<div>
			<div class="main-section-wrapper">
				<div class="section main-section">
					<img src="/toddlers/toddler.svg" class="icon" />
					<h3>Svuzzle</h3>
					<p>
						I made a small game for Svelte Hack 2023. It shows some cool things you can do with
						svelte.
					</p>
					<div class="value-bullets">
						{#each valueBullets as valueBullet}
							<div class="title">{valueBullet.valueTitle}</div>
							<div class="description">{valueBullet.valueDescription}</div>
						{/each}
					</div>
					<p>
						It's based on games I made for
						<a href="https://toddler-games.com">toddler-games.com</a>, but only with parts developed
						after February 17th.
					</p>
					<p>
						The code is open sourced on <a href="https://github.com/bersling/sveltepuzzle">Github</a
						>.
					</p>
					<p>
						Privacy statement: The app uses no cookies and doesn't collect any data from you. Only a
						couple of settings are stored in your browsers local storage.
					</p>
					<p>
						You can reach out at <a href="mailto:daniel.r.niederberger@gmail.com"
							>daniel.r.niederberger@gmail.com</a
						> for feedback, I'd love to hear from you!
					</p>
				</div>
			</div>
			<div class="section" style="background: {hueByCategoryLight(Category.PUZZLE)}">
				<img src="./assets/puzzle-icon/04-fox.jpg" class="icon" />
				<h3>Why play puzzles?</h3>
				<ul>
					<li>
						<b>Cognitive skills:</b> Playing puzzles requires problem-solving and critical thinking skills,
						helping to develop these skills in young children.
					</li>
					<li>
						<b>Shape recognition:</b> Puzzles often involve matching shapes, helping children to learn
						and recognize different shapes.
					</li>
					<li>
						<b>Patience and perseverance:</b> Solving puzzles can be challenging, teaching children the
						values of patience and perseverance.
					</li>
				</ul>
				<div class="age-tag">2-4 in toddler mode, 4-6 in preschooler mode</div>
			</div>
		</div>
	</div>
</PaddedPageWithNav>

<style lang="scss">
	p {
		margin-bottom: 20px;
	}
	.age-tag {
		display: inline-block;
		min-height: 30px;
		padding-left: 20px;
		padding-right: 20px;
		border-radius: 15px;
		background: rgba(255, 255, 255, 0.5);
		&::before {
			content: 'Age recommendation:';
			font-weight: bold;
			margin-right: 5px;
		}
	}

	@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
	.wrapper {
		font-family: 'Open Sans', sans-serif;
		flex-direction: column;
		max-width: 800px;
		margin: auto;
	}

	.section {
		position: relative;
		padding: 20px;
		border-radius: 10px;
		display: flow-root;
		margin-bottom: 10px;
		.icon {
			float: right;
			width: 100px;
			margin-bottom: 10px;
		}
	}

	.value-bullets {
		display: grid;

		grid-template-columns: 1fr 2fr;

		@media (min-width: 500px) {
			grid-template-columns: 170px 1fr;
		}

		gap: 10px;

		.title {
			font-weight: 600;
			text-align: right;
		}
	}

	.main-section-wrapper {
		background: white;
		border-radius: 10px;
	}
</style>
