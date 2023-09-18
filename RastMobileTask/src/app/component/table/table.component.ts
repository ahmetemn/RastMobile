import { Component } from '@angular/core';
import { RastMobileService } from '../../services/rast-mobile.service';
import { todoItem } from '../models/todoItem';
declare var $: any; // jQuery'yi kullanabilmek için deklarasyon ekleyin

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  todos: todoItem[] = [];
  p: number = 1;
  itemPerPage: number = 5;
  rowsPieces: number;
  total: any;
  binding: string = '';
  model = new todoItem();
  constructor(private rastMobileService: RastMobileService) {}
  ngOnInit(): void {
    console.log(this.todos.length);

    //Modal için gerekli jquery kodu BootStrap sağlıyor.
    $(document).ready(() => {
      $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus');
      });
    });

    this.loadFromLocalStorage();
  }
  //buradaki işlem tabledan rows ekler
  increaseItemPerPage() {
    if (this.rowsPieces < this.todos.length) {
      this.rowsPieces++;

    }
    this.itemPerPage=this.rowsPieces;

  }
  //buradaki işlem tabledan rows çıkartırW
  decreaseItemPerPage() {
    if (this.rowsPieces > 1) {
      this.rowsPieces--;

    }
    this.itemPerPage=this.rowsPieces;
  }
  //herhangi bir service den data çekmek isteseydik bu işlemi yapıcaktık ..
  // getTodos(){
  //   this.rastMobileService.getTodos().subscribe(resp=>{
  //     this.todos=resp.slice(0,18);
  //     this.total=resp.length;

  //   })
  // }

  //burada TODO muza yeni bir ıtem  ekleme işlemi yapyoruz.
  //özet: yeni bir todıItem nesnesi oluştur , buradaki sql de tuttuğumuz entitiyleri
  //inputtan gelen value ile doldur.
  addItem(socialMediaLink: any, socialMediaName: any, description: any) {
    const newItem: todoItem = {
      socialMediaLink: socialMediaLink,
      socialMediaName: socialMediaName,
      description: description,
    };
    this.todos.push(newItem);
    this.saveToLocalStorage();
  }
  //local storage kayıt işlemi
  saveToLocalStorage() {
    const todosJSON = JSON.stringify(this.todos);
    // JSON verisini local storage'a kaydettik.
    localStorage.setItem('todos', todosJSON);
    this.updateRowPieces();
  }
  //burada local storage kayıt ettiğimiz  ıtemları çektiğimiz yer .
  //NgOnit de çalıştırırak yazmış olduğumuz methodu sayfa yüklendiği anda alırız localStorage daki veriyi.
  loadFromLocalStorage() {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON) {
      this.todos = JSON.parse(todosJSON);
      this.updateRowPieces();
    }
  }
  updateRowPieces() {
    // Sayfa başına gösterilmesi gereken öğe sayısını belirledik (örn, 5).
    const itemsPerPage = 5;

    // Veri dizisinin uzunluğunu adlık.
    const dataLength = this.todos.length;

    // Şu an hangi sayfadaysanız onu hesapladık (örneğin, 1. sayfa veya 2. sayfa).
    const currentPage = Math.min(this.p, Math.ceil(dataLength / itemsPerPage));

    // Şu anki sayfa için gösterilmesi gereken öğe sayısını belirle.
    if (currentPage === Math.ceil(dataLength / itemsPerPage) && dataLength % itemsPerPage !== 0) {
      // Son sayfadaysanız ve veri sayısı sayfa başına gösterilmesi gereken öğe sayısının katı değilse,
      // kalan öğe sayısını gösterim yaptık.
      this.rowsPieces = dataLength % itemsPerPage;
    } else {
      // Diğer durumlarda sabit olarak itemsPerPage öğe gösterdik.
      this.rowsPieces = itemsPerPage;
    }
  }
}
