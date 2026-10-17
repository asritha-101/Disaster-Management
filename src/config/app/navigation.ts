import type { NavigationGroup, NavigationItem } from '@/types/navigation';

export const navigationGroups: NavigationGroup[] = [
  {
    title: 'DISASTER MANAGEMENT',
    items: [
      {
        href: '/dashboard',
        label: 'Overview',
      },
      {
        href: '/habitations',
        label: 'Community Risk',
      },
      {
        href: '/relocation',
        label: 'Safer Places',
      },
      {
        href: '/scenarios',
        label: 'What-if Planning',
      },
      {
        href: '/map',
        label: 'Hazard Map',
      },
      {
        href: '/reports',
        label: 'Reports',
      },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      {
        href: '/admin',
        label: 'Administration',
        requiredRoles: ['platform_admin'],
      },
    ],
  },
];

export const appNavigation: NavigationItem[] = navigationGroups.flatMap((g) => g.items);
