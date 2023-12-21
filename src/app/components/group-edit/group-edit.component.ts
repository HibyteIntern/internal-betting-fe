import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserGroupModel} from "../../models/user-group.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit{
  protected group$: Observable<UserGroupModel | undefined> = new BehaviorSubject<UserGroupModel | undefined>(undefined);

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private groupService: GroupService,
  ) { }
  ngOnInit(): void {
    const stringId = this.route.snapshot.paramMap.get("id");
    this.group$.subscribe(group => console.log(group));

    if (stringId) {
      const id = Number.parseInt(stringId);

      this.group$ = this.groupService.getOne(id);
    } else {
      this.group$ = of(undefined);
    }
  }
  protected handleFormEdit(group: UserGroupModel) {
    this.groupService.update(group).subscribe(
    () => {
          this.router.navigate(['/user-groups']);
        });
  }
}
