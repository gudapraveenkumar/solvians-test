import { FlatTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";

interface User {
  fullName: string;
  children?: User[];
  dateOfBirth: string;
  userId: number;
}

const TREE_DATA: User[] = [
  {
    fullName: "Tom",
    children: [
      { fullName: "Alex", children: [], dateOfBirth: "21/08/1993", userId: 1 },
      {
        fullName: "Alice",
        children: [
          {
            fullName: "Thomas",
            children: [],
            dateOfBirth: "21/05/1993",
            userId: 2
          }
        ],
        dateOfBirth: "21/08/1993",
        userId: 3
      },
      { fullName: "Bruno", children: [], dateOfBirth: "21/08/1993", userId: 4 }
    ],
    dateOfBirth: "21/08/1993",
    userId: 5
  },
  {
    fullName: "Marat",
    children: [
      {
        fullName: "Marat Alex",
        children: [],
        dateOfBirth: "21/08/1993",
        userId: 7
      }
    ],
    dateOfBirth: "21/08/1993",
    userId: 6
  },
  {
    fullName: "Julie",
    children: [],
    dateOfBirth: "21/08/1993",
    userId: 8
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  fullName: string;
  level: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private _transformer = (node: User, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      fullName: node.fullName,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
