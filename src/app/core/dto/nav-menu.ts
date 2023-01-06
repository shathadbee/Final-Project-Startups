import{ NavItemDto } from './nav-item' ;

export class NavMenuDto{
displayName='';
children:NavItemDto[]=[];
constructor(displayName:string, children:NavItemDto[]){
 this.displayName=displayName;
 this.children=children;
}
}
