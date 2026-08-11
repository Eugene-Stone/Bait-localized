// Скрипт отправки Email
export default {
	async afterCreate(event: any) {
		const { result } = event;

		// Сначала формируем строки для полей формы
		const fieldsHtml = Object.entries(result.formData)
			.map(([key, value]) => {
				if (Array.isArray(value)) {
					return `<p><b>${key}</b>: ${value.join(', ')}</p>`;
				}
				return `<p><b>${key}</b>: ${value}</p>`;
			})
			.join('');

		// Собираем итоговое тело письма: добавляем заголовок сверху
		const html = `
			<h2>Форма - ${result.formTitle}</h2>
			<hr />
			${fieldsHtml}
		`;

		try {
			await strapi.plugins.email.services.email.send({
				to: 'admin@gmail.com',
				subject: `Новая заявка - ${result.formTitle}`,
				html,
			});
		} catch (error) {
			// Логируем ошибку в терминал, чтобы она не роняла весь запрос
			console.error('Ошибка при отправке email через Mailtrap:', error);
		}
	},
};
