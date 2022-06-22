import { shallowMount } from '@vue/test-utils'
import DestinationColumn from '@/components/DestinationColumn.vue'


describe('DestinationColumn.vue Test', () => {
  const wrapper = shallowMount(DestinationColumn, {
    propsData: {
      count: 1,
      arrPlanets: [{"name":"Donlon","distance":100},{"name":"Enchai","distance":200},{"name":"Jebing","distance":300},{"name":"Sapir","distance":400},{"name":"Lerbin","distance":500},{"name":"Pingasor","distance":600}],
      arrVehicles: [{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},{"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},{"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}]
    }
  })
  it('name of component is correct', () => {

    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('DestinationColumn')

  })

  it('text matches passed prop for number', () => {

    expect(wrapper.text()).toMatch('Destination 1')
    
  })

  it('emits planetChosen event when planet is chosen', () => {

    wrapper.findAll('option').at(1).trigger('change')

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('planetChosen')).toBeTruthy()
    expect(wrapper.emitted('planetChosen').length).toBe(1)
  })

  it('emits vehicleChosen event when vehicle is chosen', async () => {

    const select = wrapper.find('select')
    await select.setValue("Donlon")
    wrapper.findAll('input').at(1).trigger('change')

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('vehicleChosen')).toBeTruthy()
    expect(wrapper.emitted('vehicleChosen').length).toBe(1)
  })
})
