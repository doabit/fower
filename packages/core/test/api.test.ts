import { toFinalProps } from '../src/api/toFinalProps'
import { createStyle } from '../src/api/createStyle'

describe('api', () => {
  it('createStyle', () => {
    expect(createStyle('p-10')).toMatchObject({ padding: '10px' })
    expect(createStyle('p-10', 'm-10')).toMatchObject({ padding: '10px', margin: '10px' })
    expect(
      createStyle('p-10', 'm-10', {
        background: 'red',
      }),
    ).toMatchObject({ padding: '10px', margin: '10px', background: 'red' })
  })

  it('toFinalProps', () => {
    expect(toFinalProps({ 'p-10': true })).toMatchObject({ style: { padding: '10px' } })
  })
})
