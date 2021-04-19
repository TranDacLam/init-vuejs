import Vue from 'vue'
// Handle add class disabled action
Vue.directive('disable-element', {
    bind: function (el, binding, vnode) {
        if(binding.value){
            el.classList.add('disable-element');
        }
    },
    update: function (el, binding, vnode) {
        if(binding.value){
            el.classList.add('disable-element');
        }else{
            el.classList.remove('disable-element');
        }
    },
});
