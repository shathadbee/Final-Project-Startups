export class NavItemDto{
  displayName:string;
  route:string;
  icon:string;
  role :string;
  children!:NavItemDto[];


constructor (displayName:string,
  route:string,
  icon:string,
  role:string,
  children?:NavItemDto[]

){
 this.displayName=displayName;
 this.route=route;
 this.icon=icon;
this.role=role;
 this.children=children? children:[];
}
}
