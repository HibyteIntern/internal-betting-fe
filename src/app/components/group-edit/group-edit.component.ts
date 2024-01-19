import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {FullUserGroupModel} from "../../entity/full-user-group.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit{
  protected group$: Observable<FullUserGroupModel | undefined> = new BehaviorSubject<FullUserGroupModel | undefined>(undefined);

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private groupService: GroupService,
  ) { }
  ngOnInit(): void {
    const stringId = this.route.snapshot.paramMap.get("id");
    if (stringId) {
      const id = Number.parseInt(stringId);
      this.groupService.getOneFull(id).subscribe(group => { this.group$ = of(group); });
    }
  }
  protected handleFormEdit(group: FullUserGroupModel) {
    this.groupService.update(group).subscribe(
    () => {
          this.router.navigate(['/user-groups']);
        });
  }
}
