import { shallowMount } from '@vue/test-utils'
import ResultView from '@/components/ResultView.vue'


describe('ResultView.vue Test', () => {
  const wrapper = shallowMount(ResultView, {
    propsData: {
      intTotalTime: 200,
      strPlanetName: "Donlon",
      strStatus: "success"
    }
  })
  const wrapper2 = shallowMount(ResultView, {
    propsData: {
      intTotalTime: 200,
      strPlanetName: "",
      strStatus: "false"
    }
  })
  it('name of component is correct', () => {

    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('ResultView')

  })

  it('text matches success case', () => {

    expect(wrapper.text()).toMatch('Success')
    
  })

  it('text matches failure case', () => {

    expect(wrapper2.text()).toMatch('Unlucky')
    
  })

  it('emits restart event when Start Again is clicked', () => {

    wrapper.find('.startAgain-button').trigger('click')

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('restart')).toBeTruthy()
    expect(wrapper.emitted('restart').length).toBe(1)
  })
})
