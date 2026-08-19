// Скрипт отправки Email
function escapeHtml(value: unknown): string {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export default {
	async afterCreate(event: any) {
		const { result } = event;
		let formData: Record<string, unknown> = {};

		try {
			formData =
				typeof result.formData === 'string'
					? JSON.parse(result.formData)
					: (result.formData ?? {});
		} catch {
			formData = { value: result.formData };
		}

		// Сначала формируем строки для полей формы
		const fieldsHtml = Object.entries(formData)
			.map(([key, value]) => {
				if (Array.isArray(value)) {
					return `<p><b>${escapeHtml(key)}</b>: ${escapeHtml(value.join(', '))}</p>`;
				}
				return `<p><b>${escapeHtml(key)}</b>: ${escapeHtml(value)}</p>`;
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
