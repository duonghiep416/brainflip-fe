import { LearningSection } from '@/app/(private)/components/LearningSection/LearningSection';
import styles from './Widgets.module.scss';
import AccordionPanel from '@/components/AccordionPanel/AccordionPanel';

export const Widgets = () => {
  return (
    <AccordionPanel
      sections={[
        {
          id: 'Widgets',
          title: 'Widgets',
          content: (
            <div className="flex gap-6">
              <LearningSection />
              <div>abc</div>
            </div>
          ),
        },
      ]}
    />
  );
};
