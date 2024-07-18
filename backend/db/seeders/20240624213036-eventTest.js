"use strict";

const { Event } = require("../models");
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const events = [
	{
		venueId: 6,
		groupId: 1,
		name: "AfroTech",
		description: "The Global Gathering for Innovators and Inclusive Tech Companies",
		type: "In person",
		capacity: 10,
		price: 599.99,
		startDate: "2025-01-01T05:00Z",
		endDate: "2025-01-01T06:00Z",
      },
      {
		venueId: 4,
		groupId: 1,
		name: "Software Engineering Cohort",
		description: "Learning software engineering from the best bootcamp on earth. Almost to graduation",
		type: "In person",
		capacity: 100,
		price: 35999.99,
		startDate: "2024-07-18T10:00Z",
		endDate: "2024-07-18T11:00Z",
	},
	{
		venueId: 7,
		groupId: 2,
		name: "Google Cloud Next",
		description: "Learn. Engage. Solve. Where will digital transformation go next? Discover the unknowns, challenges, and opportunities facing business—and start solving for them. Say hello to tomorrow. It is here today, at Next.",
		type: "In person",
		capacity: 15,
		price: 299.99,
		startDate: "2024-07-18T11:01Z",
		endDate: "2024-07-18T12:00Z",
	},
	{
		venueId: 8,
		groupId: 3,
		name: "Google I/O",
		description: "Discover Google's latest product launches and more. It's open to everyone online!",
		type: "Online",
		capacity: 20,
		price: 199.99,
		startDate: "2025-03-01T05:00Z",
		endDate: "2025-03-01T06:00Z",
	},
	{
		venueId: 4,
		groupId: 4,
		name: "Render ATL",
		description: "Render strives to be the premier continuing education conference for industry technology professionals. While we were Founded by talented underrepresented technology professionals, our mission is to be the premier technology event for professionals to learn and enrich their skills and obtain knowledge with exciting interactions beyond and within the workplace.",
		type: "In person",
		capacity: 25,
		price: 899.99,
		startDate: "2025-04-01T05:00Z",
		endDate: "2025-04-01T06:00Z",
	},
	{
		venueId: 5,
		groupId: 5,
		name: "Tech Innovate",
		description: "Tech Equity Collective Innovate is an interactive event experience illuminating technology innovations, community connections and pathways to and through tech for aspiring and emerging Black talent.",
		type: "In person",
		capacity: 20,
		price: 999.99,
		startDate: "2025-05-01T05:00Z",
		endDate: "2025-05-01T06:00Z",
	},
	{
		venueId: null,
		groupId: 6,
		name: "Monday Stand-up!",
		description: "Telling the community what you did the previous week,where you are at the current week, any roadblock or challenges, and some affirmations for yourself and others.",
		type: "Online",
		capacity: 15,
		price: 1.99,
		startDate: "2025-06-01T05:00Z",
		endDate: "2025-06-01T06:00Z",
	},
	{
		venueId: null,
		groupId: 7,
		name: "Men Cry Too Introduction",
		description: "Where men come together to discuss their current problems, mental issues, build a safe space, and have a sense of comfortably from other men alike",
		type: "Online",
		capacity: 10,
		price: 12.99,
		startDate: "2025-07-01T05:00Z",
		endDate: "2025-07-01T06:00Z",
	},
	{
		venueId: null,
		groupId: 8,
		name: "Certifications in Tech: Are They Worth the Investment?",
		description: "Is chasing certifications a good strategy if you're starting out in your tech career? Can it boost your prospects in the industry? Join us for an insightful AMA session on the trend of “cert-chasing” and its impact on tech careers. With our guest, Greg Skeene, we will delve into the value of tech certifications in todays job market compared to traditional degrees and hands-on experience, and discuss how employers view certifications versus other qualifications. You will also learn about the potential downsides of over-certification and how to avoid counterproductive cert-chasing.",
		type: "Online",
		capacity: 5,
		price: 50.99,
		startDate: "2025-08-01T05:00Z",
		endDate: "2025-08-01T06:00Z",
	},
	{
		venueId: 9,
		groupId: 9,
		name: "The Creative Technologist: Will Hatcher on AI and Digital Transformation",
		description: "Join us for an interview with Will Hatcher, aka “King Willonius,” a futurist, comedian, and digital architect with a remarkable journey in the tech industry. In this weeks AMA session, Will shares his insights on explorative AI, the creation of the AI version of BBL Drizzy, and the exciting world of AI film production.",
		type: "In person",
		capacity: 100,
		price: 250.99,
		startDate: "2025-09-01T05:00Z",
		endDate: "2025-09-01T06:00Z",
	},
	{
		venueId: 10,
		groupId: 10,
		name: "Harnessing Feedback and Growth Opportunities in Your Career: Lessons from Omogbolahan Alli",
		description: "Did you know that people with a growth mindset are 47% more likely to embrace challenges and push through setbacks? Join us for this week's AMA session where we'll help you enhance your performance and navigate your career path more effectively. Our guest speaker, Omogbolahan Alli, will share personal experiences, practical strategies, and actionable advice on cultivating a growth mindset, seeking and using feedback, and finding mentorship.",
		type: "In person",
		capacity: 1000,
		price: 5000.99,
		startDate: "2025-10-01T05:00Z",
		endDate: "2025-10-01T06:00Z",
	},
	{
		venueId: 11,
		groupId: 11,
		name: "The Career Starter Guide to Beating Imposter Syndrome, According to Arri Rucker",
		description: "Learn from Arri Rucker as he shares his personal experiences, offers actionable advice, and discusses the importance of mentorship, networking, and self-efficacy.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00Z",
		endDate: "2025-11-01T06:00Z",
      },
      {
		venueId: 11,
		groupId: 2,
		name: "AMA Session",
		description: "In todays AMA session, we will discover practical strategies to build confidence, develop essential skills, and navigate these challenges.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-10-01T05:00Z",
		endDate: "2025-10-01T06:00Z",
      },
      {
		venueId: 9,
		groupId: 2,
		name: "Smart Networking 101 with Suraj Bramania: From First Contact to Lasting Connections",
		description: "Did you know that nearly 70% of professionals hired in 2016 had a connection at their company? This shows just how important a well-nurtured network can be for your career.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-11-01T05:00Z",
		endDate: "2025-11-01T06:00Z",
	},{
		venueId: 8,
		groupId: 2,
		name: "Finding Your Path as an Early-Career Tech Professional: Lessons from Monet Hopkins",
		description: "We know it's tough to navigate the tech industry, especially when you're just starting out. That's why we invited Monet Hopkins, a UX Designer at American Express, to share her journey and insights. Monet transitioned from PR and teaching to making waves in tech, and she's here to reveal the strategies that helped her land job offers and the essential skills to stay ahead. Monet offers insider tips on networking, continuous learning, and finding the right mentors. Plus, discover the unique qualities that have set her apart and fueled her success in the tech world.",
		type: "In person",
		capacity: 500,
		price: 99.99,
		startDate: "2025-09-01T05:00Z",
		endDate: "2025-09-01T06:00Z",
	},{
		venueId: 11,
		groupId: 2,
		name: "Switching Gears: Lessons from Career Changers",
		description: "Our panelists also discuss effective strategies for mastering new skills, the significance of building a professional network, and navigating the job market.",
		type: "Online",
		capacity: 500,
		price: 99.99,
		startDate: "2024-07-18T10:00Z",
		endDate: "2024-07-18T11:00Z",
	},{
		venueId: 7,
		groupId: 3,
		name: "Driving Innovation: The Importance and Impact of AI Adoption with Ruben Harris",
		description: "Today, AI is everywhere. Advanced robotics and artificial intelligence are increasing productivity and improving lives. But amid these advancements, worries arise about the future of our jobs and the skills necessary to excel in this evolving landscape. In this weeks AMA session, Ruben Harris explains why we should look at technological developments with optimism, rather than fear. ",
		type: "Online",
		capacity: 500,
		price: 99.99,
		startDate: "2024-07-18T10:00Z",
		endDate: "2024-07-18T11:00Z",
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await Event.bulkCreate(events, { ...options, validate: true });
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		let names = [];
		let groupIds = [];
		let startDates = [];
		let endDates = [];

		for (let event of events) {
			names.push(event.name);
			groupIds.push(event.groupId);
			startDates.push(event.startDate);
			endDates.push(event.endDate);
		}
		// options.tableName = "Events";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Events",
			{
				name: {
					[Op.in]: names,
				},
				groupId: {
					[Op.in]: groupIds,
				},
				startDate: {
					[Op.in]: startDates,
				},
				endDate: {
					[Op.in]: endDates,
				},
			},
			options
		);
	},
};
