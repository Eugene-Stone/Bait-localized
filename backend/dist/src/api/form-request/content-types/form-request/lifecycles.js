"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Скрипт отправки Email
function escapeHtml(value) {
    return String(value !== null && value !== void 0 ? value : '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
exports.default = {
    async afterCreate(event) {
        var _a;
        const { result } = event;
        let formData = {};
        try {
            formData =
                typeof result.formData === 'string'
                    ? JSON.parse(result.formData)
                    : ((_a = result.formData) !== null && _a !== void 0 ? _a : {});
        }
        catch {
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
			<h2>Форма - ${escapeHtml(result.formTitle)}</h2>
			<hr />
			${fieldsHtml}
		`;
        try {
            await strapi.plugins.email.services.email.send({
                to: 'admin@gmail.com',
                subject: `Новая заявка - ${result.formTitle}`,
                html,
            });
        }
        catch (error) {
            // Логируем ошибку в терминал, чтобы она не роняла весь запрос
            console.error('Ошибка при отправке email через Mailtrap:', error);
        }
    },
};
