import { LearningSection } from '@/app/(private)/components/LearningSection/LearningSection';
import styles from './Widgets.module.scss';
import AccordionPanel from '@/components/AccordionPanel/AccordionPanel';
import { CalendarSection } from '@/app/(private)/components/CalendarSection/CalendarSection';
import { ProfileSection } from '@/app/(private)/components/ProfileSection/ProfileSection';

export const Widgets = () => {
  return (
    <AccordionPanel
      sections={[
        {
          id: 'Widgets',
          title: 'Widgets',
          content: (
            <div className="flex gap-6 flex-col sm:flex-row justify-center">
              <LearningSection />
              <CalendarSection />
              <ProfileSection />
            </div>
          ),
        },
      ]}
    />
  );
};
