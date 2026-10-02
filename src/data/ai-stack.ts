
















import {
  Sparkle,
  Coffee,
  Robot,
  Article,
  FilmSlate,
  UsersThree,
  Database,
  SlackLogo,
  MagnifyingGlass,
  ChatCircleDots,
  FlowArrow,
  PhoneCall,
  Browser,
  Broadcast,
  Timer,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'




export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string

  what: string

  stack?: string
  status?: StackStatus

  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const ANTHROPIC: StackLogo = { src: '/icons/anthropic.svg', name: 'Anthropic' }
const OPENAI: StackLogo = { src: '/icons/openai.svg', name: 'OpenAI' }
const SLACK: StackLogo = { src: '/icons/slack.svg', name: 'Slack' }
const NOUS: StackLogo = { src: '/icons/nousresearch.svg', name: 'Nous Research' }

const WHAT = 'PLACEHOLDER - tell me what to put here: one plain line on what this does.'
const STACK = 'PLACEHOLDER - model, tools, where it runs'


export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'PLACEHOLDER - tell me what to put here: one line on the systems you build and run.',
  stack: 'PLACEHOLDER - your brand',
  children: [
    {
      id: 'project-a',
      Icon: Coffee,
      logos: [ANTHROPIC],
      name: 'Project A',
      what: WHAT,
      stack: STACK,
      status: 'Live',
    },
    {
      id: 'category-one',
      Icon: Robot,
      name: 'Category One',
      what: 'PLACEHOLDER - tell me what to put here: what the systems in this group have in common.',
      children: [
        {
          id: 'project-b',
          Icon: Article,
          logos: [ANTHROPIC],
          name: 'Project B',
          what: WHAT,
          stack: STACK,
          status: 'Internal',
        },
        {
          id: 'project-c',
          Icon: FilmSlate,
          logos: [OPENAI],
          name: 'Project C',
          what: WHAT,
          stack: STACK,
          status: 'Internal',
        },
        {
          id: 'project-d',
          Icon: UsersThree,
          logos: [ANTHROPIC],
          name: 'Project D',
          what: WHAT,
          stack: STACK,
          status: 'Internal',
        },
      ],
    },
    {
      id: 'category-two',
      Icon: Database,
      name: 'Category Two',
      what: 'PLACEHOLDER - tell me what to put here: what the systems in this group have in common.',
      children: [
        {
          id: 'project-e',
          Icon: SlackLogo,
          logos: [ANTHROPIC, SLACK],
          name: 'Project E',
          what: WHAT,
          stack: STACK,
          status: 'Live',
        },
        {
          id: 'project-f',
          Icon: MagnifyingGlass,
          logos: [ANTHROPIC],
          name: 'Project F',
          what: WHAT,
          stack: STACK,
          status: 'Live',
        },
      ],
    },
    {
      id: 'category-three',
      Icon: ChatCircleDots,
      name: 'Category Three',
      what: 'PLACEHOLDER - tell me what to put here: what the systems in this group have in common.',
      children: [
        {
          id: 'project-g',
          Icon: FlowArrow,
          logos: [ANTHROPIC],
          name: 'Project G',
          what: WHAT,
          stack: STACK,
          status: 'Live',
        },
        {
          id: 'project-h',
          Icon: PhoneCall,
          logos: [ANTHROPIC],
          name: 'Project H',
          what: WHAT,
          stack: STACK,
          status: 'Beta',
        },
        {
          id: 'project-i',
          Icon: Browser,
          logos: [ANTHROPIC],
          name: 'Project I',
          what: WHAT,
          stack: STACK,
          status: 'Live',
        },
      ],
    },
    {
      id: 'project-j',
      Icon: Broadcast,
      logos: [NOUS],
      name: 'Project J',
      what: WHAT,
      stack: STACK,
      status: 'Live',
      children: [
        {
          id: 'project-k',
          Icon: Timer,
          name: 'Project K',
          what: WHAT,
          stack: STACK,
          status: 'Live',
        },
      ],
    },
  ],
}
