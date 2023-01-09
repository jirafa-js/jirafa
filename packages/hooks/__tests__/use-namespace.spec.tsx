import { mount } from '@vue/test-utils'
import { useNamespace } from '..'

describe('use-namespace', () => {
  it('should provide bem correctly', () => {
    const wrapper = mount({
      setup() {
        const ns = useNamespace('test')
        const cssVar = ns.cssVar({ border: 'none', color: '' })
        const cssVarBlock = ns.cssVarBlock({
          outline: '2px solid currentColor',
          'text-color': '',
        })
        return () => (
          <div
            class={[
              ns.b(),
              ns.b('body'),
              ns.e('content'),
              ns.m('active'),
              ns.be('body', 'content'),
              ns.bm('body', 'active'),
              ns.bem('body', 'content', 'active'),
              ns.is('focus'),
              ns.e(), // return empty string
              ns.m(), // return empty string
              ns.be(), // return empty string
              ns.em(), // return empty string
              ns.bem(), // return empty string
              ns.is('hover', undefined), // return empty string
              ns.is('clicked', false), // return empty string
            ]}
            style={{ ...cssVar, ...cssVarBlock }}
          >
            test
          </div>
        )
      },
    })

    const div = wrapper.find('div')
    expect(div.classes()).toEqual([
      'j-test', //  ns.b(),
      'j-test-body', // ns.b('body'),
      'j-test__content', // ns.e('content'),
      'j-test--active', // ns.m('active'),
      'j-test-body__content', // ns.be('body', 'content'),
      'j-test-body--active', // ns.bm('body', 'active'),
      'j-test-body__content--active', // ns.bem('body', 'content', 'active'),
      'is-focus', // ns.is('focus'),
    ])
    const style = div.attributes('style')
    expect(style).toMatch('--j-border')
    expect(style).not.toMatch('--j-color')
    expect(style).toMatch('--j-test-outline')
    expect(style).not.toMatch('--j-test-text-color')
  })
})
