import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import Hero from '@/components/sections/Hero';
import Request from '@/components/sections/Request';
import Reviews from '@/components/sections/Reviews';
import Schedule from '@/components/sections/Schedule';
import Service from '@/components/sections/Service';
import TextSection from '@/components/sections/TextSection';

// eslint-disable-next-line
export default function DynamicSections({ sections }: any) {
	// eslint-disable-next-line
	return sections.map((sect: any, i: number) => {
		switch (sect.__component) {
			case 'sections.about':
				return <About key={i} data={sect} />;
			case 'sections.gallery':
				return <Gallery key={i} data={sect} />;
			case 'sections.hero':
				return <Hero key={i} data={sect} />;
			case 'sections.request':
				return <Request key={i} data={sect} />;
			case 'sections.reviews':
				return <Reviews key={i} data={sect} />;
			case 'sections.schedule':
				return <Schedule key={i} data={sect} />;
			case 'sections.service':
				return <Service key={i} data={sect} />;
			case 'sections.text-section':
				return <TextSection key={i} data={sect} />;
			default:
				return null;
		}
	});
}
