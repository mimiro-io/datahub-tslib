import { Entity, PropertyValue, ReferenceValue, Transaction, QueryResult } from "./datahub"

export function Log(t: any, level?: string):void{console.log(t,level)}
export function NewEntity():Entity { return NewEntity() }
export function NewEntityFrom(entity: Entity, addType: boolean, copyProps: boolean, copyRefs: boolean): Entity|null {
    console.log(entity, addType, copyProps, copyRefs);  return NewEntity()
}
export function AsEntity(obj:any):Entity|null { console.log(obj);return null }
export function GetId(entity: Entity):string|null { console.log(entity); return ""; }
export function SetId(entity: Entity, id: string):void{console.log(entity, id); }
export function SetDeleted(entity: Entity, value: boolean):void{console.log(entity, value); }
export function GetDeleted(entity: Entity):boolean|null { console.log(entity); return false; }
export function PrefixField(prefix: string, field: string): string { return prefix+field; }
export function AssertNamespacePrefix(urlExpansion: string):string {console.log(urlExpansion); return ""; }
export function GetNamespacePrefix(urlExpansion: string):string {console.log(urlExpansion); return ""; }
export function SetProperty(entity:Entity, propertyNamespacePrefix: string, propertyName:string, value: PropertyValue):void {
    console.log(entity, propertyNamespacePrefix, propertyName, value); 
}
export function GetProperty(entity:Entity, propertyNamespacePrefix: string, propertyName:string, defaultValue?: PropertyValue):PropertyValue|null {
    console.log(entity, propertyNamespacePrefix, propertyName, defaultValue); return "";
}
export function GetReference(entity:Entity, refNamespacePrefix: string, refName:string, defaultValue?: ReferenceValue):ReferenceValue|null {
    console.log(entity, refNamespacePrefix, refName, defaultValue); return "";
}
export function AddReference(entity: Entity, nsPrefix: string, refName: string, refValue: ReferenceValue):void {
    console.log(entity, nsPrefix, refName, refValue);
}
export function RenameProperty(entity: Entity, originalPrefix: string, originalName: string, newPrefix: string, newName: string):void {
    console.log(entity, originalPrefix, originalName, newPrefix, newName);
}
export function RemoveProperty(entity: Entity, prefix: string, name: string):void{
    console.log(entity, prefix, name)
}
export function UUID(): string { return ""; }
export function ExecuteTransaction(txn: Transaction): Error { console.log(txn); return new Error(); }
export function NewTransaction(): Transaction { return NewTransaction(); }
export function Timing(name: string, end: boolean): void {console.log(name, end)}
export function ToString(object: any): string {return ""+object}
export function FindById(entityId: string, datasets?: string[]): Entity|null{console.log(entityId,datasets);return null}
export function Query(startingEntities: string[], predicate: string, inverse: boolean, datasets?: string[]):QueryResult[] {
    console.log(startingEntities,predicate,inverse,datasets)
    return new Array()
}
