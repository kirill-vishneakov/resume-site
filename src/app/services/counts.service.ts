import { computed, Injectable, signal } from '@angular/core';

export interface Group {
  title: string;
  count: number;
}

export enum State {
  create = 'create',
  edit = 'edit',
}

@Injectable({
  providedIn: 'root',
})
export class CountsService {
  count = computed(() =>
    this.groups()
      .map((el) => el.count)
      .reduce((val, acum) => val + acum, 0)
  );

  groups = signal<Group[]>([]);

  state = signal(State.create);
  editGroup = signal<Group | null>(null);

  searchText = signal('');

  searchGroups = computed(() =>
    this.groups().filter((group) => group.title.includes(this.searchText()))
  );

  add(group: Group) {
    this.groups.set([...this.groups(), group]);
  }

  editing(group: Group) {
    this.state.set(State.edit);
    this.editGroup.set(group);
  }

  edit() {
    this.state.set(State.create);
  }

  remove(title: string) {
    this.groups.set(this.groups().filter((group) => group.title !== title));
  }
}
