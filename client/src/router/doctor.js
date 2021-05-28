const CHECK_ROLE = 2;

export default [
	{
		path: "/doctor",
		component: () => import("../views/dashboard/main.vue"),
		children: [
			{
				path: "",
				name: "doctor.home",
				component: () => import("../views/doctor/home.vue"),
				meta: { requiresAuth: true, checkRole: CHECK_ROLE },
			},
		],
	},
];