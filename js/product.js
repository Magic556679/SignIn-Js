const url = 'https://vue3-course-api.hexschool.io/';
const path = 'wu9zo4s';

const app = {
    data:{
        url:'https://vue3-course-api.hexschool.io/',
        path:'wu9zo4s',
        products:[],
    },
    getData() {
        axios.get(`${this.data.url}api/${this.data.path}/admin/products`)
        .then((res) => {
            if (res.data.success) {
                this.data.products = res.data.products;
                this.render();
            }
        });
    },
    render(){
        const productIndex = document.getElementById('productList');
        let str = '';
        this.data.products.forEach(item => {
            str += `<tr>
            <td>${item.category}</td>
            <td width="120">
            ${item.origin_price}
            </td>
            <td width="120">
            ${item.price}
            </td>
            <td width="100">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled? 'checked': ''} data-action="complete" data-id="${item.id}">
                    <label class="form-check-label" for="${item.id}">${item.is_enabled? '啟用' : '未啟用'}</label>        
                </div>
            </td>
            <td width="120">
            <button type="button" class="btn btn-sm btn-outline-danger move delBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
            </td>
        </tr>`
        });
        productIndex.innerHTML = str;
        const deleteBtn = document.querySelectorAll('.delBtn');
        deleteBtn.forEach((item) => {
        item.addEventListener('click', this.delproductList);
        })

    },
    delproductList(e){
        const id = e.target.dataset.id;
        // 為什麼使用this.data.url會錯誤呢？
        axios.delete(`${url}api/${path}/admin/product/${id}`)
          .then(res => {
            app.getData();
        });
        
    },
    init() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    }
}
app.init();



