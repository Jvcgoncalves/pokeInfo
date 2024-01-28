export default class DamageRelation {
  constructor(typeData){
    this.typeName = typeData.name
    this.double_damage_from = typeData.damage_relations.double_damage_from.map(type => type.name) 
    this.half_damage_from = typeData.damage_relations.half_damage_from.map(type => type.name)
    this.no_damage_from = typeData.damage_relations.no_damage_from.map(type => type.name)
  }
}