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


  // TEST 4 — Search by Product Name
  it('should filter products when searching by product name', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: [
          {
            productId: 'P001',
            productName: 'Gaming Mouse',
            category: 'Accessories',
            quantity: 10,
            price: 500,
            stockStatus: 'In Stock'
          },
          {
            productId: 'P002',
            productName: 'Keyboard',
            category: 'Accessories',
            quantity: 5,
            price: 800,
            stockStatus: 'Low Stock'
          }
        ]
      }
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search ID, name, or category..."]'
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


  // TEST 6 — Search by Product ID
  it('should filter products when searching by product ID', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: [
          {
            productId: 'P001',
            productName: 'Gaming Mouse',
            category: 'Accessories',
            quantity: 10,
            price: 500,
            stockStatus: 'In Stock'
          },
          {
            productId: 'P002',
            productName: 'Keyboard',
            category: 'Accessories',
            quantity: 5,
            price: 800,
            stockStatus: 'Low Stock'
          }
        ]
      }
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search ID, name, or category..."]'
    )

    await searchInput.setValue('P002')

    expect(wrapper.text()).toContain('Keyboard')
    expect(wrapper.text()).not.toContain('Gaming Mouse')
  })


  // TEST 7 — Search by Category
  it('should filter products when searching by category', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: [
          {
            productId: 'P001',
            productName: 'Gaming Mouse',
            category: 'Accessories',
            quantity: 10,
            price: 500,
            stockStatus: 'In Stock'
          },
          {
            productId: 'P002',
            productName: 'Office Chair',
            category: 'Furniture',
            quantity: 5,
            price: 8000,
            stockStatus: 'Low Stock'
          }
        ]
      }
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search ID, name, or category..."]'
    )

    await searchInput.setValue('Furniture')

    expect(wrapper.text()).toContain('Office Chair')
    expect(wrapper.text()).not.toContain('Gaming Mouse')
  })


  // TEST 8 — In Stock Filter
  it('should display only In Stock products when the In Stock filter is selected', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: [
          {
            productId: 'P001',
            productName: 'Gaming Mouse',
            category: 'Accessories',
            quantity: 10,
            price: 500,
            stockStatus: 'In Stock'
          },
          {
            productId: 'P002',
            productName: 'Keyboard',
            category: 'Accessories',
            quantity: 2,
            price: 800,
            stockStatus: 'Low Stock'
          },
          {
            productId: 'P003',
            productName: 'Monitor',
            category: 'Electronics',
            quantity: 0,
            price: 5000,
            stockStatus: 'Out of Stock'
          }
        ]
      }
    })

    const selects = wrapper.findAll('select')

    await selects[0].setValue('In Stock')

    expect(wrapper.text()).toContain('Gaming Mouse')
    expect(wrapper.text()).not.toContain('Keyboard')
    expect(wrapper.text()).not.toContain('Monitor')
  })


  // TEST 9 — Low Stock Filter
  it('should display only Low Stock products when the Low Stock filter is selected', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: [
          {
            productId: 'P001',
            productName: 'Gaming Mouse',
            category: 'Accessories',
            quantity: 10,
            price: 500,
            stockStatus: 'In Stock'
          },
          {
            productId: 'P002',
            productName: 'Keyboard',
            category: 'Accessories',
            quantity: 2,
            price: 800,
            stockStatus: 'Low Stock'
          },
          {
            productId: 'P003',
            productName: 'Monitor',
            category: 'Electronics',
            quantity: 0,
            price: 5000,
            stockStatus: 'Out of Stock'
          }
        ]
      }
    })

    const selects = wrapper.findAll('select')

    await selects[0].setValue('Low Stock')

    expect(wrapper.text()).toContain('Keyboard')
    expect(wrapper.text()).not.toContain('Gaming Mouse')
    expect(wrapper.text()).not.toContain('Monitor')
  })


  // TEST 10 — Out of Stock Filter
  it('should display only Out of Stock products when the Out of Stock filter is selected', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: [
          {
            productId: 'P001',
            productName: 'Gaming Mouse',
            category: 'Accessories',
            quantity: 10,
            price: 500,
            stockStatus: 'In Stock'
          },
          {
            productId: 'P002',
            productName: 'Keyboard',
            category: 'Accessories',
            quantity: 2,
            price: 800,
            stockStatus: 'Low Stock'
          },
          {
            productId: 'P003',
            productName: 'Monitor',
            category: 'Electronics',
            quantity: 0,
            price: 5000,
            stockStatus: 'Out of Stock'
          }
        ]
      }
    })

    const selects = wrapper.findAll('select')

    await selects[0].setValue('Out of Stock')

    expect(wrapper.text()).toContain('Monitor')
    expect(wrapper.text()).not.toContain('Gaming Mouse')
    expect(wrapper.text()).not.toContain('Keyboard')
  })


  // TEST 11 — Combined Search and Filter
  it('should combine search and status filtering correctly', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: [
          {
            productId: 'P001',
            productName: 'Gaming Mouse',
            category: 'Accessories',
            quantity: 10,
            price: 500,
            stockStatus: 'In Stock'
          },
          {
            productId: 'P002',
            productName: 'Gaming Keyboard',
            category: 'Accessories',
            quantity: 2,
            price: 800,
            stockStatus: 'Low Stock'
          },
          {
            productId: 'P003',
            productName: 'Office Chair',
            category: 'Furniture',
            quantity: 0,
            price: 8000,
            stockStatus: 'Out of Stock'
          }
        ]
      }
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search ID, name, or category..."]'
    )

    const selects = wrapper.findAll('select')

    await searchInput.setValue('Gaming')
    await selects[0].setValue('Low Stock')

    expect(wrapper.text()).toContain('Gaming Keyboard')
    expect(wrapper.text()).not.toContain('Gaming Mouse')
    expect(wrapper.text()).not.toContain('Office Chair')
  })

})