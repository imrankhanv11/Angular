import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BookActions from '../../store/books/book.actions';
import { selectAllBooks, selectLoading } from '../../store/books/book.selectors';
import { Observable } from 'rxjs';
import { BookType } from '../../types/bookType';
import { CommonModule } from '@angular/common';
import { BookCarkComponent } from '../../componets/bookCard.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, BookCarkComponent],
    templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
    books$!: Observable<BookType[]>;
    loading$!: Observable<boolean>;

    constructor(private store: Store) {
        this.books$ = this.store.select(selectAllBooks);
        this.loading$ = this.store.select(selectLoading);
    }

    ngOnInit() {
        this.books$.subscribe(books => {
            if (!books || books.length === 0) {
                this.store.dispatch(BookActions.loadBooks());
            }
        });
    }


    addToCart(book: BookType) {
        alert(book.title);
    }

    deleteOneCart(bookId: number) {
        alert(bookId);
    }
}
