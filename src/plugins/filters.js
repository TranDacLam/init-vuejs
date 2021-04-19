import Vue from 'vue'

Vue.filter('money', function(value, {currency}){
    if(isNaN(value)){
        return 0
    }
    if(currency){
        switch(currency.toLowerCase()){
            case 'vnd':
                return new Intl.NumberFormat().format(value) + ' VND'
            case 'dolar':
                return '$'+ new Intl.NumberFormat(undefined, { currency: 'EUR' }).format(value)
        }
    }
	return new Intl.NumberFormat().format(value)
})

Vue.filter('formatDate', function(value){
	if( value ){
		return moment(value).format('MMM D,YYYY')
	}
	return ''
})