const selectionString = "Select"
const hazard_modifier = 0.75
const minor_debuff_modifier = 0.75
const major_debuff_modifier = 0.5
const all_or_nothing_modifier = 1.75
const centered_on_self = 1.5
// contextual trigger = +0.5, EG divebomb from flying above, stealth attack, etc.
    // major debuff = -0.5, minor debuff = -0.25, 
    // 20ft range = 0 , 60ft range = -0.25, 120ft range = -0.5
    // AoE 5 = -.25, AoE 10 = -0.5, AoE 15 = -0.75 
    // all-or-nothing = +0.5, half on save = -0.5
    // delay, next turn, delay, 10 minutes or longer...

const distances_arr = ["0ft","15ft","20ft","30ft","60ft","120ft"]

const distance_dam_mod = {
    "n/a" : 1,
    "0ft": 1.5,
    "15ft": 1.25,
    "20ft": 1,
    "30ft": 0.75,
    "60ft": 0.5,
    "120ft": 0.25
}

// const aoe_types_arr = [
//     "main hit, burst AoE for half",
//     "AoE Radius", 
//     "Cone",
//     "Line"
// ]

const all_aoe_types = [
    "single-target",  "radius", "cone",
    "line",  "hazard",  "distant hit and half burst",
    "self-centered burst", "other"
]

const line_dam_types = [
    "10ft","20ft","30ft","40ft","60ft"
]

const line_dam_mod = {
    "n/a" : 1,
    "10ft": 1,
    "20ft": 0.75,
    "30ft": 0.5,
    "40ft": 0.25,
    "60ft": 0.125
}

const aoe_radius_ranges = [
    "5ft","10ft","20ft","30ft","40ft","50ft"]

const radius_dam_mod = {
    "n/a":1,
    "5ft": 0.5,
    "10ft": 0.375,
    "20ft": 0.25,
    "30ft": 0.185,
    "40ft": 0.125,
    "50ft": 0.1
}

const cone_ranges = [
    "10ft", "15ft", "20ft", "30ft", "40ft", "50ft", "60ft"
]

const cone_dam_mod = {
    "n/a":1,
    "10ft": 0.75,
    "15ft": 0.5,
    "20ft": 0.375,
    "30ft": 0.25,
    "40ft": 0.185,
    "50ft": 0.125,
    "60ft": 0.1
}

const hit_and_burst_aoe_ranges = [
    "5ft", "10ft", "20ft", "40ft"
]

const main_target_half_burst_mod = {
    "5ft":0.75,
    "10ft":0.5,
    "20ft":0.375,
    "40ft":0.25
}

const misc_aoes = [
    "5ft wall",
    "single 5ft piller/spire",
    "2, 5ft pillars",
    "single 15ft pillar/spire",
    "15ft wall",
    "2 intersecting 15ft lines + shape",
    "ring, 5ft diameter",
    "3, 5ft pillars",
    "ring/square 10ft diameter",
    "30ft cylinder",
    "crescent-moon shape"
]

const misc_aoe_modifier = {
    "5ft wall":0.75,
    "single 5ft piller/spire":0.75,
    "2, 5ft pillars": 0.5,
    "single 15ft pillar/spire": 0.5,
    "15ft wall":0.5,    
    "2 intersecting 15ft lines + shape": 0.5,
    "ring, 5ft diameter":0.5,
    "3, 5ft pillars": 0.375,
    "ring/square 10ft diameter": 0.25,
    "30ft cylinder": 0.125,
}

// hazard stacks on top of the AOE damage decrease
const hazard_types = [
    "radius hazard", "line hazard", 
    "growing threat radius",
]

const other_boost_200 =[
    // # 2x
    "Action to charge (delay)", "Must stand still and use BA to charge (delay)", 
    "Attack and fall prone at end of turn", "Attack and major debilitation",
    "Action to conjure hazard area that needs to be triggered"
]

const other_boost_15 = [
    // # 1.5
    "Sacrifice movement for big attack", "Attack does extra damage if moving 20ft straight",
    "Attack and minor debilitaiton"
]

const other_boost_125 = [
    // # 1.25
    "Bonus Action charge, delay to next turn"
]
const unused_info_arr = [
    "teleport-strike to target", "hit melee then teleport away", "teleport to target, then aura burst",
    "alter terrain (forming cover, elevation, etc)", "target at 60ft becomes source for directional cone of damage (hit+burst cone)",
    "target damages/debil. aura around it (stench cloud/crown of spores)"

]

const major_debilitations = [
    "blind",  "paralysis", "muted", "poisoned", "dizzy: fail next dex save/check",
    "30ft pushback", "15ft push in chosen direction",
    "unconscious", "sleep", "charm", "madness", "weak:fail next str save/check",
    "grapple+damage vuln", "swallowed", "fear", "baffled:fail next cha save/check",
    "petrification", "charmed", "inflict slow", "fail next (core stat/skill) check",
    "poisoned", "disarm", "Movement speed 0", "compelled movement in random direction"
    ]
const minor_debilitations = [
    "muted", "enrage", "grappled", "suffocation", "disadv. on certain skill check",
    "prone", "restrained", "Expose Weakness (single disadvantage)",
    "inflict vulnerability (eg, douse in flammable oil)", "Armor Corrosion/damage (-AC)", 
    "half movement speed", "contest to disarm", "halve movement speed",
    "10ft pushback", "5ft push in chosen direction"
]

// const dnd5e_dam_ability_dictionary = {
//     "burst_DOT": "initial damage, then lesser DoT at End of Enemy turn", // from magmin ignite
//     "subtle_DOT": "light damage, then bigger DoT at end of turn",
//     "weaken_and_DOT": "hex an ability then do damage as bonus action like hex, should be 25% normal damage, auto-hit",
//     "dam_and_minor_debil": "-20% dam and minor debil like grapple",
//     "momentum_Atk": "After moving a distance, attack's avg x1.5 or debilitate like stun/knockback. May require check to not fall prone.",
//     "charm_DC" : "Pass DC or get charmed",
//     "eye-ray or wild magic": "roll on appropriate table if applicable",
//     "damage core stat": "like intellect devourer damaging INT",
//     "major_debil": "poison, petrify, or paralysis at DC, (lowered -20% rounded up if AOE)",
//     "zone_debil": "AoE summoned or aura, like stench. DC or major debilitation like blind, curse, poison, disadv.",
//     "vampiric_drain_dam": "deal DAM, heal 1/2 amount",
//     "elemental weapon": "DAM of type",
//     "vampiric_drain_support": "deal 1/2 DAM and heal that amount to target",
//     "summon_offense": "summon ally/flying weapon to do DAM as bonus action",
//     "summon_defense": "aura/effect active, like summoning ablative HP/AC",
//     "summon_control": "summon something that manipulates environment, eg. mage hand",
//     "lay trap": "like rope of entanglement, bear trap, magic sigil, scroll, etc."
// }
// const dnd5e_util_ability_dictionary = {
//     "dmage reflect/transfer":"under condition eg. grappling, transfers 1/2 damage to target",
//     "illuminate":"shed light from self or point",
//     "curative_spell": "heal damage/status ailment",
//     "polymorph": "change shape to appropriate target",
//     "burrow": "gain dig speed equal to walking",
//     "detection": "e.g. tremorsense, detect life, tracking",
//     "spell redirection": "after succeeding on save, redirect to target with own atk or save",
//     "attack reduction": "simplified deflect missiles, DC to negate damage, then do own atk"
// }
      // special abil:
      //Blinding Spittle (Recharge 5-6). The mouther spits a chemical 
    // glob at a point it can see within 15 feet of it. The glob explodes 
    // in a blinding flash of light on impact. Each creature within 5 
    // feet of the flash must succeed on a DC 13 Dexterity saving 
    // throw or be blinded until the end of the mouther's next turn.
    
    
    // Aberrant Ground. The ground in a 10-foot radius around the 
    // mouther is doughlike difficult terrain. Each creature that starts 
    // its turn in that area must succeed on a DC 10 Strength saving 
    // throw or have its speed reduced to 0 until the start of its 
    // next turn. 
    // Gibbering. The mouther babbles incoherently while it can 
    // see any creature and isn't incapacitated. Each creature that 
    // starts its turn within 20 feet of the mouther and can hear the 
    // gibbering must succeed on a DC 10 Wisdom saving throw. or go mad
    
    // luring Song. The harpy sings a magical melody. Every 
    // humanoid and giant within 300 feet of the harpy that can hear 
    // the song must succeed on a DC 11 Wisdom saving throw or 
    // be charmed until the song ends. The harpy must take a bonus 
    // action on its subsequent turns to continue singing. It can stop 
    // singing at any time. The song ends if the harpy is incapacitated. 
    // charmed must move toward sound at walking speed, or take DAM in psychic
    // Devour Intellect. The intellect devourer targets one creature 
    // it can see within 10 feet of it that has a brain. The target must 
    // succeed on a DC 12 Intelligence saving throw aga inst this 
    // magic or take 11 (2d10) psychic damage. Also on a failure, 
    // roll3d6: If the total equals or exceeds the target's Intelligence 
    // score, that score is reduced to 0. The target is stunned until it 
    // regains at least one point of Intelligence. 
      //  suggestion: target believes next thing to be true
      // "Nonlethal strike": "x1.5 to dam, but cannot drop below 1HP",
      // "Disintegrating attack": "There's no coming back from this"
    
      // Net. Ranged Weapon Attack: +3 to hit, range Sf15 ft., one Large 
      // or smaller creature. Hit: The target is restrained. A creature 
      // can use its action to make a DC 10 Strength check to free itself 
      // or another creature in a net, ending the effect on a success. 
      // Dealing 5 slashing damage to the net (AC 10) frees the target 
      // without harming it and destroys the net. 
      // REACTIONS 
      // Sticky Shield. When a creature misses the kuo-toa with a melee 
      // weapon attack, the kuo-toa uses its sticky shield to catch 
      // the weapon. The attacker must succeed on a DC 11 Strength 
      // saving throw, or the weapon becomes stuck to the kuo-toa's 
      // shield. If the weapon's wielder can't or won't let go of the 
      // weapon, the wielder is grappled while the weapon is stuck. 
      // While stuck, the weapon can't be used. A creature can pull 
      // the weapon free by taking an action to make a DC 11 Strength 
      // check and succeeding.
      // Antennae. The rust monster corrodes a nonmagical ferrous 
      // metal object it can see within 5 feet of it. If the object isn't 
      // being worn or carried, the touch destroys a 1-foot cube of it. If 
      // the object is being worn or carried by a creature, the creature 
      // can make a DC 11 Dexterity saving throw to avoid the rust 
      // monster's touch. 
      // If the object touched is either metal armor or a metal shield 
      // being worn or carried, its takes a permanent and cumulative 
      // -1 penalty to the AC it offers. Armor reduced to an AC of 10 
      // or a shield that drops to a +0 bonus is destroyed. If the object 
      // touched is a held metal weapon, it rusts as described in the 
      // Rust Metal trait. 
    
      // Heated Body. A creature that touches the salamander or hits 
    // it with a melee attack while within 5 feet of it takes 7 (2d6) 
    // fire damage. 
    
    // Terrifying Glare. The scarecrow targets one creature it can 
    // see within 30 feet of it. If the target can see the scarecrow, the 
    // target must succeed on a DC 11 Wisdom saving throw or be 
    // magically frightened until the end of the scarecrow's next turn. 
    // The frightened target is paralyzed. 
    
    
    // consider stealth, movement types (climb, hover, swim), sight, and core stats
    // special spell DC tweaks, type/status resitances and vulnerabilities

    //  moving hazard patterns like statues threatening a cone in a circle, guillotines cutting in line formations, or radius around mushroom spores

// delay/require trigger +1.5
// cannot move  +1.25
// all-or-nothing 


    const misc_attack_flair = [
        "reckless (get adv. but suffer opening)", "lay trap (e.g. impuing a rune on the floor)"
    ]

    export {hazard_modifier, hazard_types, 
        minor_debuff_modifier, major_debuff_modifier, 
        all_or_nothing_modifier, centered_on_self, distance_dam_mod, 
        main_target_half_burst_mod, radius_dam_mod, cone_ranges, cone_dam_mod,
        misc_aoe_modifier, hit_and_burst_aoe_ranges,
        other_boost_200, other_boost_15, other_boost_125, line_dam_mod,
        distances_arr,line_dam_types,all_aoe_types,
        major_debilitations, minor_debilitations,
        aoe_radius_ranges};
