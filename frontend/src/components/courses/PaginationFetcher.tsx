'use client';

import { use } from 'react';
import Pagination from './Pagination';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { CourseExtended, Meta } from '@/types';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	// eslint-disable-next-line
	coursesPromise: Promise<any>;
};
export default function PaginationFetcher({ localePack, coursesPromise }: Props) {
	const { dataPage, pageSize } = use(coursesPromise);

	const { data: courses, meta }: { data: CourseExtended[]; meta: Meta } = dataPage;
	const pagination = meta.pagination;

	if (!dataPage?.meta?.pagination) return null;

	return (
		<Pagination
			locale={localePack.locale}
			dict={localePack.dict}
			pageSize={pageSize}
			pagination={dataPage.meta.pagination}
		/>
	);
}
