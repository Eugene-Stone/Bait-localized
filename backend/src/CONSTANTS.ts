export const SITE_NAME = 'Bait site';

export const PAGE_SEO = {
	// populate: '*',
	populate: {
		ogImage: {
			populate: '*',
		},
	},
} as const;

export const GLOBAL_POPULATE = {
	Header: {
		populate: {
			Logo: {
				populate: '*',
			},
			Menu: {
				populate: {
					MenuLink: {
						populate: '*',
					},
				},
			},
			LangList: {
				populate: {
					Link: {
						populate: '*',
					},
				},
			},
		},
	},
	Footer: {
		populate: {
			Menu: {
				populate: {
					MenuLink: {
						populate: '*',
					},
				},
			},
		},
	},
} as const;

export const SECTIONS_POPULATE = {
	on: {
		'sections.about': {
			populate: '*',
			// populate: {
			// 	image: true,
			// 	image: {
			// 		fields: ["alternativeText", "url"] //  Можно перечислить конкретные
			// 	}
			// },
		},
		'sections.gallery': {
			populate: {
				gallery: {
					populate: {
						images: true,
					},
				},
			},
		},
		'sections.hero': {
			populate: {
				image: true,
			},
		},
		'sections.map': {
			populate: '*',
		},
		'sections.opening-hours': {
			populate: '*',
		},
		'sections.request': {
			// 1. У компонента request открываем populate, чтобы зайти внутрь его полей
			populate: {
				// 2. Раскрываем поле связи "form"
				form: {
					populate: {
						// 3. Внутри формы раскрываем динамическую зону "fields"
						fields: {
							on: {
								// 4. И только тут перечисляем компоненты инпутов из категории "form"
								'forms.form-checkboxes': {
									populate: '*',
								},
								'forms.form-input': {
									populate: '*',
								},
								'forms.form-select': {
									populate: '*',
								},
								'forms.form-submit': {
									populate: '*',
								},
								'forms.form-textarea': {
									populate: '*',
								},
								'forms.form-agree': {
									populate: '*',
								},
							},
						},
					},
				},
			},
		},
		'sections.reviews': {
			populate: '*',
		},
		'sections.services': {
			populate: {
				link: true,
			},
		},
		'sections.text-section': {
			populate: '*',
		},
	},
} as const;
