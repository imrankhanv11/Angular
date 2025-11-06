import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookType } from "../types/bookType";

@Component({
    selector: "app-book-card",
    imports: [CommonModule],
    standalone: true,
    templateUrl: "bookCard.component.html",
})
export class BookCarkComponent {
    @Input() book!: BookType;

    @Output() addToCart = new EventEmitter<BookType>();

    @Output() deleteOneCart = new EventEmitter<number>();

    onAddToCart(){
        this.addToCart.emit(this.book);
    }

    onDelete(){
        this.deleteOneCart.emit(this.book.bookId);
    }
};