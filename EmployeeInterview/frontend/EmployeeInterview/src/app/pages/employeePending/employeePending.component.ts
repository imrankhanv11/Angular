import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { empInterviewType } from "../../common/type/empInterviewRespons";
import { EmployeeInterviewService } from "../../services/empInterview.service";
import { EmpPendingComponentRow } from "../../common/components/empPendingRow/empPendingRow.component";

@Component({
    selector: 'app-employeepending',
    standalone: true,
    imports: [CommonModule, EmpPendingComponentRow],
    templateUrl: './employeePending.component.html'
})
export class EmployeePendingTask implements OnInit{
    EmpPending: empInterviewType[] = [];

    private EmpInterview: EmployeeInterviewService = inject(EmployeeInterviewService);
    
    ngOnInit(): void {
        this.onEmpPending();
    }
    onEmpPending() {
        this.EmpInterview.getAllEmpInterview().subscribe({
            next: (response) => this.EmpPending = response
        });
    }
}