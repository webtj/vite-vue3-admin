// import defaultimg from '../../assets/images/default.gif'
export default {
  mounted(el, binding, vnode) {
    let src = binding.value
    //赋值给data-src
    el.setAttribute('data-src', src)
    // el.setAttribute('src', defaultimg)
    const observe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let src = el.getAttribute('data-src')
          el.setAttribute('src', src)
          observe.unobserve(el)
        }
      })
    })
    observe.observe(el)
    let { top } = el.getBoundingClientRect()
  }
}