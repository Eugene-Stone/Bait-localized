'use client';

import { use } from 'react';
import CourseList from '@/components/courses/CoursesList';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { CourseExtended } from '@/types';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	// eslint-disable-next-line
	coursesPromise: Promise<any>;
};
export default function CourseListFetcher({ localePack, coursesPromise }: Props) {
	// Распаковываем промис с данными
	const { dataPage } = use(coursesPromise);
	const courses: CourseExtended[] = dataPage?.data || [];

	return <CourseList dict={localePack.dict} locale={localePack.locale} courses={courses} />;
}
