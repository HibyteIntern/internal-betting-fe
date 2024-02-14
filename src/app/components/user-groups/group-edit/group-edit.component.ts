import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../service/group.service';
import {UserGroupModel} from "../../../entity/user-group.model";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss'],
})
export class GroupEditComponent implements OnInit {
  protected group$: Observable<UserGroupModel | undefined> =
    new BehaviorSubject<UserGroupModel | undefined>(undefined);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
  ) {}
  ngOnInit(): void {
    const stringId = this.route.snapshot.paramMap.get('id');
    if (stringId) {
      const id = Number.parseInt(stringId);
      this.group$ = this.groupService.getOne(id);
    }
  }
  protected handleFormEdit(group: UserGroupModel) {
    this.groupService.update(group).subscribe(() => {
      this.router.navigate(['/user-groups']);
    });
  }
}
