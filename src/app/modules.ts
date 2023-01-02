

export interface Module {
  name:string,
  imports: string []
}

export interface OrderedModule  extends Module{
  order: number
}




export const MODULES = [
  {
    name: 'buttons',
    imports: ['utilities']
  },
  {
    name: 'cards',
    imports: ['utilities', 'buttons']
  },
  {
    name: 'datatables',
    imports: ['utilities', 'inputs']
  },
  {
    name: 'forms',
    imports: ['utilities', 'inputs']
  },
  {
    name: 'graphics',
    imports: ['utilities', 'cards', 'buttons']
  },
  {
    name: 'inputs',
    imports: ['utilities']
  },
  {
    name: 'modals',
    imports: ['utilities',  'forms']
  },
  {
    name: 'tabs',
    imports: ['utilities', 'buttons']
  },
  {
    name: 'utilities',
    imports: []
  }
]
