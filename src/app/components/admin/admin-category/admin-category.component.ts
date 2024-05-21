import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../models/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {
  categoryList: any[] = [];
  isSidePanelVisible: boolean = false;
  constructor(private catService: CategoryService,private toast:ToastrService) { }
  categoryObj: Category = {
    'categoryId': 0,
    'categoryName': ""
  }
  ngOnInit(): void {
    this.getAllCategory();
    console.log(this.categoryList);
  }
  getAllCategory() {
    this.catService.getAllCategory().subscribe((res: any) => {
      this.categoryList = res;
    })
  }
  openSidePanel() {
    this.isSidePanelVisible = true;
  }
  closeSidePanel() {
    this.isSidePanelVisible = false;
  }
  onEdit(category: any) {
    this.categoryObj = category;
    this.openSidePanel();
  }
  onDelete(categoryId: any) {
    this.catService.deleteCategory(categoryId).subscribe((res:any)=>{
      this.toast.success("Deleted successfully");
    })
  }
  onReset() {
  }
  onSubmit() {
    this.catService.createCategory(this.categoryObj).subscribe((res:any)=>{
      this.toast.success("Category added successfully");
      this.isSidePanelVisible=false;
      this.getAllCategory();
    })
  }
  onUpdate() {
    this.catService.updateCategory(this.categoryObj.categoryId, this.categoryObj).subscribe((res:any)=>{
      this.toast.success("Updated successfully");
    })
    
  }
}
