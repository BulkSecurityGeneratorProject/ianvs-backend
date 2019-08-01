import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'country',
                loadChildren: './country/country.module#IanvsCountryModule'
            },
            {
                path: 'province',
                loadChildren: './province/province.module#IanvsProvinceModule'
            },
            {
                path: 'town',
                loadChildren: './town/town.module#IanvsTownModule'
            },
            {
                path: 'company',
                loadChildren: './company/company.module#IanvsCompanyModule'
            },
            {
                path: 'branch',
                loadChildren: './branch/branch.module#IanvsBranchModule'
            },
            {
                path: 'company-category',
                loadChildren: './company-category/company-category.module#IanvsCompanyCategoryModule'
            },
            {
                path: 'company-status',
                loadChildren: './company-status/company-status.module#IanvsCompanyStatusModule'
            },
            {
                path: 'branch-status',
                loadChildren: './branch-status/branch-status.module#IanvsBranchStatusModule'
            },
            {
                path: 'expense-upload',
                loadChildren: './expense-upload/expense-upload.module#IanvsExpenseUploadModule'
            },
            {
                path: 'expense-status',
                loadChildren: './expense-status/expense-status.module#IanvsExpenseStatusModule'
            },
            {
                path: 'expense-category',
                loadChildren: './expense-category/expense-category.module#IanvsExpenseCategoryModule'
            },
            {
                path: 'income-capture',
                loadChildren: './income-capture/income-capture.module#IanvsIncomeCaptureModule'
            },
            {
                path: 'income-category',
                loadChildren: './income-category/income-category.module#IanvsIncomeCategoryModule'
            },
            {
                path: 'income-details',
                loadChildren: './income-details/income-details.module#IanvsIncomeDetailsModule'
            },
            {
                path: 'income-payments',
                loadChildren: './income-payments/income-payments.module#IanvsIncomePaymentsModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsEntityModule {}
