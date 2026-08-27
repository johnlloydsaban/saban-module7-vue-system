import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ProductForm from '../components/ProductForm.vue'
import ProductList from '../components/ProductList.vue'

describe('Inventory Management System', () => {

  // TEST 1 — Add Product
  it('should emit save when a valid product is submitted', async () => {
    const wrapper = mount(ProductForm)

    await wrapper.find('input[placeholder="P001"]').setValue('P001')
    await wrapper.find('input[placeholder="Gaming Mouse"]').setValue('Gaming Mouse')

    await wrapper.find('select').setValue('Electronics')

    const numberInputs = wrapper.findAll('input[type="number"]')

    await numberInputs[0].setValue(10)
    await numberInputs[1].setValue(500)

    const selects = wrapper.findAll('select')

    await selects[1].setValue('In Stock')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')[0][0]).toMatchObject({
      productId: 'P001',
      productName: 'Gaming Mouse',
      category: 'Electronics',
      quantity: 10,
      price: 500,
      stockStatus: 'In Stock'
    })
  })


  // TEST 2 — Validation
  it('should show an error when required fields are empty', async () => {
    const wrapper = mount(ProductForm)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain(
      'Please complete all required fields.'
    )

    expect(wrapper.emitted('save')).toBeFalsy()
  })


  // TEST 3 — Display Products
  it('should display products passed through props', () => {
    const products = [
      {
        id: 1,
        productId: 'P001',
        productName: 'Gaming Mouse',
        description: 'Wireless mouse',
        category: 'Electronics',
        quantity: 10,
        price: 500,
        stockStatus: 'In Stock'
      }
    ]

    const wrapper = mount(ProductList, {
      props: { products }
    })

    expect(wrapper.text()).toContain('Gaming Mouse')
    expect(wrapper.text()).toContain('Electronics')
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('₱500.00')
  })


  // TEST 4 — Search Products
  it('should filter products when searching by product name', async () => {
    const products = [
      {
        id: 1,
        productId: 'P001',
        productName: 'Gaming Mouse',
        description: 'Wireless mouse',
        category: 'Electronics',
        quantity: 10,
        price: 500,
        stockStatus: 'In Stock'
      },
      {
        id: 2,
        productId: 'P002',
        productName: 'Keyboard',
        description: 'Mechanical keyboard',
        category: 'Electronics',
        quantity: 5,
        price: 1000,
        stockStatus: 'In Stock'
      }
    ]

    const wrapper = mount(ProductList, {
      props: { products }
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search product..."]'
    )

    await searchInput.setValue('mouse')

    expect(wrapper.text()).toContain('Gaming Mouse')
    expect(wrapper.text()).not.toContain('Keyboard')
  })


  // TEST 5 — Delete Product Event
  it('should emit delete when the delete button is clicked', async () => {
    const products = [
      {
        id: 1,
        productId: 'P001',
        productName: 'Gaming Mouse',
        description: 'Wireless mouse',
        category: 'Electronics',
        quantity: 10,
        price: 500,
        stockStatus: 'In Stock'
      }
    ]

    const wrapper = mount(ProductList, {
      props: { products }
    })

    const deleteButton = wrapper.find('.action-delete')

    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual([1])
  })

})