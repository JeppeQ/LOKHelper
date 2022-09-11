const { Duration, DateTime } = require("luxon")

export function timeString(seconds) {
  const dur = Duration.fromObject({ seconds }).shiftTo('days', 'hours', 'minutes', 'seconds').toObject()

  dur.seconds = Math.ceil(dur.seconds)

  const hours = dur.hours < 10 ? '0' + dur.hours : dur.hours
  const minutes = dur.minutes < 10 ? '0' + dur.minutes : dur.minutes
  const fsecs = dur.seconds < 10 ? '0' + dur.seconds : dur.seconds

  return `${dur.days}d  ${hours}:${minutes}:${fsecs}`
}

export function questTimeString(now, date) {
  let { days, hours, minutes } = DateTime.fromISO(date).diff(now, ['days', 'hours', 'minutes'])

  return `${days}d ${hours}h ${Math.ceil(minutes)}m`
}

export function calcHelpTime(time, helps, alliance_help1, alliance_help2) {
  let help_time = 0;
  let remaining = time;

  for (let help = 0; help < helps; help++) {
    // speedup is 1% of remaining time
    let speedup = Math.floor(remaining * 0.01);
    speedup = speedup === 0 ? ++speedup : speedup;
    speedup += alliance_help1 * 10 + alliance_help2 * 10;
    help_time += speedup;
    remaining -= speedup;

    if (remaining <= 0) {
      return time;
    }
  }

  return help_time;
};

export function helps(hall) {
  switch (Number(hall)) {
    case 1:
    case 2:
      return 10;
    case 3:
    case 4:
      return 11;
    case 5:
    case 6:
      return 12;
    case 7:
    case 8:
      return 13;
    case 9:
    case 10:
      return 14;
    case 11:
    case 12:
      return 15;
    case 13:
    case 14:
      return 16;
    case 15:
    case 16:
      return 17;
    case 17:
    case 18:
      return 18;
    case 19:
    case 20:
      return 19;
    case 21:
    case 22:
      return 20;
    case 23:
    case 24:
      return 21;
    case 25:
    case 26:
      return 22;
    case 27:
    case 28:
      return 23;
    case 29:
      return 24;
    case 30:
      return 25;
  }
}

export const icons = {
  lumber: require('../assets/images/resources/lumber.png'),
  stone: require('../assets/images/resources/stone.png'),
  gold: require('../assets/images/resources/gold.png'),
  food: require('../assets/images/resources/food.png'),
  golden_pillar: require('../assets/images/resources/golden_pillar.png')
}

export const rewardIcon = {
  adv_teleport: require('../assets/images/rewards/adv_teleport.png'),
  alliance_badge: require('../assets/images/rewards/alliance_badge.png'),
  ap_1: require('../assets/images/rewards/ap_1.png'),
  ap_2: require('../assets/images/rewards/ap_2.png'),
  ap_3: require('../assets/images/rewards/ap_3.png'),
  ap_4: require('../assets/images/rewards/ap_4.png'),
  att_boost_1: require('../assets/images/rewards/att_boost_1.png'),
  att_boost_2: require('../assets/images/rewards/att_boost_2.png'),
  constr_speedup_1: require('../assets/images/rewards/constr_speedup_1.png'),
  constr_speedup_2: require('../assets/images/rewards/constr_speedup_2.png'),
  constr_speedup_3: require('../assets/images/rewards/constr_speedup_3.png'),
  constr_speedup_4: require('../assets/images/rewards/constr_speedup_4.png'),
  constr_speedup_5: require('../assets/images/rewards/constr_speedup_5.png'),
  constr_speedup_6: require('../assets/images/rewards/constr_speedup_6.png'),
  constr_speedup_7: require('../assets/images/rewards/constr_speedup_7.png'),
  constr_speedup_8: require('../assets/images/rewards/constr_speedup_8.png'),
  def_boost_1: require('../assets/images/rewards/def_boost_1.png'),
  def_boost_2: require('../assets/images/rewards/def_boost_2.png'),
  epic_piece: require('../assets/images/rewards/epic_piece.png'),
  food_1: require('../assets/images/rewards/food_1.png'),
  food_2: require('../assets/images/rewards/food_2.png'),
  food_3: require('../assets/images/rewards/food_3.png'),
  food_4: require('../assets/images/rewards/food_4.png'),
  food_5: require('../assets/images/rewards/food_5.png'),
  food_6: require('../assets/images/rewards/food_6.png'),
  food_7: require('../assets/images/rewards/food_7.png'),
  food_8: require('../assets/images/rewards/food_8.png'),
  food_9: require('../assets/images/rewards/food_9.png'),
  food_prod_1: require('../assets/images/rewards/food_prod_1.png'),
  food_prod_2: require('../assets/images/rewards/food_prod_2.png'),
  gems_1: require('../assets/images/rewards/gems_1.png'),
  gems_2: require('../assets/images/rewards/gems_2.png'),
  gems_3: require('../assets/images/rewards/gems_3.png'),
  gems_4: require('../assets/images/rewards/gems_4.png'),
  gems_5: require('../assets/images/rewards/gems_5.png'),
  gems_6: require('../assets/images/rewards/gems_6.png'),
  gold_1: require('../assets/images/rewards/gold_1.png'),
  gold_2: require('../assets/images/rewards/gold_2.png'),
  gold_3: require('../assets/images/rewards/gold_3.png'),
  gold_4: require('../assets/images/rewards/gold_4.png'),
  gold_5: require('../assets/images/rewards/gold_5.png'),
  gold_6: require('../assets/images/rewards/gold_6.png'),
  gold_7: require('../assets/images/rewards/gold_7.png'),
  gold_8: require('../assets/images/rewards/gold_8.png'),
  gold_9: require('../assets/images/rewards/gold_9.png'),
  gold_chest: require('../assets/images/rewards/gold_chest.png'),
  gold_prod_1: require('../assets/images/rewards/gold_prod_1.png'),
  gold_prod_2: require('../assets/images/rewards/gold_prod_2.png'),
  golden_pillar: require('../assets/images/rewards/golden_pillar.png'),
  healing_speedup_1: require('../assets/images/rewards/healing_speedup_1.png'),
  healing_speedup_2: require('../assets/images/rewards/healing_speedup_2.png'),
  healing_speedup_3: require('../assets/images/rewards/healing_speedup_3.png'),
  healing_speedup_4: require('../assets/images/rewards/healing_speedup_4.png'),
  healing_speedup_5: require('../assets/images/rewards/healing_speedup_5.png'),
  healing_speedup_6: require('../assets/images/rewards/healing_speedup_6.png'),
  healing_speedup_7: require('../assets/images/rewards/healing_speedup_7.png'),
  healing_speedup_8: require('../assets/images/rewards/healing_speedup_8.png'),
  healing_speedup_9: require('../assets/images/rewards/healing_speedup_9.png'),
  hp_boost_1: require('../assets/images/rewards/hp_boost_1.png'),
  hp_boost_2: require('../assets/images/rewards/hp_boost_2.png'),
  normal_piece: require('../assets/images/rewards/normal_piece.png'),
  magic_piece: require('../assets/images/rewards/magic_piece.png'),
  leg_piece: require('../assets/images/rewards/leg_piece.png'),
  lumber_1: require('../assets/images/rewards/lumber_1.png'),
  lumber_2: require('../assets/images/rewards/lumber_2.png'),
  lumber_3: require('../assets/images/rewards/lumber_3.png'),
  lumber_4: require('../assets/images/rewards/lumber_4.png'),
  lumber_5: require('../assets/images/rewards/lumber_5.png'),
  lumber_6: require('../assets/images/rewards/lumber_6.png'),
  lumber_7: require('../assets/images/rewards/lumber_7.png'),
  lumber_8: require('../assets/images/rewards/lumber_8.png'),
  lumber_9: require('../assets/images/rewards/lumber_9.png'),
  lumber_prod_1: require('../assets/images/rewards/lumber_prod_1.png'),
  lumber_prod_2: require('../assets/images/rewards/lumber_prod_2.png'),
  march_1: require('../assets/images/rewards/march_1.png'),
  march_2: require('../assets/images/rewards/march_2.png'),
  random_teleport: require('../assets/images/rewards/random_teleport.png'),
  research_speedup_1: require('../assets/images/rewards/research_speedup_1.png'),
  research_speedup_2: require('../assets/images/rewards/research_speedup_2.png'),
  research_speedup_3: require('../assets/images/rewards/research_speedup_3.png'),
  research_speedup_4: require('../assets/images/rewards/research_speedup_4.png'),
  research_speedup_5: require('../assets/images/rewards/research_speedup_5.png'),
  research_speedup_6: require('../assets/images/rewards/research_speedup_6.png'),
  research_speedup_7: require('../assets/images/rewards/research_speedup_7.png'),
  rss_chest_1: require('../assets/images/rewards/rss_chest_1.png'),
  rss_chest_2: require('../assets/images/rewards/rss_chest_2.png'),
  rss_chest_3: require('../assets/images/rewards/rss_chest_3.png'),
  rss_collection_1: require('../assets/images/rewards/rss_collection_1.png'),
  rss_collection_2: require('../assets/images/rewards/rss_collection_2.png'),
  scout_1: require('../assets/images/rewards/scout_1.png'),
  scout_2: require('../assets/images/rewards/scout_2.png'),
  shield_1: require('../assets/images/rewards/shield_1.png'),
  shield_2: require('../assets/images/rewards/shield_2.png'),
  silver_chest: require('../assets/images/rewards/silver_chest.png'),
  speed_boost_1: require('../assets/images/rewards/speed_boost_1.png'),
  speed_boost_2: require('../assets/images/rewards/speed_boost_2.png'),
  speed_chest_1: require('../assets/images/rewards/speed_chest_1.png'),
  speed_chest_2: require('../assets/images/rewards/speed_chest_2.png'),
  speed_chest_3: require('../assets/images/rewards/speed_chest_3.png'),
  speedup_1: require('../assets/images/rewards/speedup_1.png'),
  speedup_2: require('../assets/images/rewards/speedup_2.png'),
  speedup_3: require('../assets/images/rewards/speedup_3.png'),
  speedup_4: require('../assets/images/rewards/speedup_4.png'),
  speedup_5: require('../assets/images/rewards/speedup_5.png'),
  speedup_6: require('../assets/images/rewards/speedup_6.png'),
  speedup_7: require('../assets/images/rewards/speedup_7.png'),
  speedup_8: require('../assets/images/rewards/speedup_8.png'),
  speedup_9: require('../assets/images/rewards/speedup_9.png'),
  speedup_10: require('../assets/images/rewards/speedup_10.png'),
  stone_1: require('../assets/images/rewards/stone_1.png'),
  stone_2: require('../assets/images/rewards/stone_2.png'),
  stone_3: require('../assets/images/rewards/stone_3.png'),
  stone_4: require('../assets/images/rewards/stone_4.png'),
  stone_5: require('../assets/images/rewards/stone_5.png'),
  stone_6: require('../assets/images/rewards/stone_6.png'),
  stone_7: require('../assets/images/rewards/stone_7.png'),
  stone_8: require('../assets/images/rewards/stone_8.png'),
  stone_9: require('../assets/images/rewards/stone_9.png'),
  stone_prod_1: require('../assets/images/rewards/stone_prod_1.png'),
  stone_prod_2: require('../assets/images/rewards/stone_prod_2.png'),
  troop_speedup_1: require('../assets/images/rewards/troop_speedup_1.png'),
  troop_speedup_2: require('../assets/images/rewards/troop_speedup_2.png'),
  troop_speedup_3: require('../assets/images/rewards/troop_speedup_3.png'),
  troop_speedup_4: require('../assets/images/rewards/troop_speedup_4.png'),
  troop_speedup_5: require('../assets/images/rewards/troop_speedup_5.png'),
  troop_speedup_6: require('../assets/images/rewards/troop_speedup_6.png'),
  troop_speedup_7: require('../assets/images/rewards/troop_speedup_7.png'),
  troop_speedup_8: require('../assets/images/rewards/troop_speedup_8.png'),
  troop_speedup_9: require('../assets/images/rewards/troop_speedup_9.png'),
  vip_1: require('../assets/images/rewards/vip_1.png'),
  vip_2: require('../assets/images/rewards/vip_2.png'),
  vip_3: require('../assets/images/rewards/vip_3.png'),
  vip_4: require('../assets/images/rewards/vip_4.png'),
  vip_5: require('../assets/images/rewards/vip_5.png'),
  vip_6: require('../assets/images/rewards/vip_6.png'),
  green_egg: require('../assets/images/rewards/green_egg.png'),
  red_egg: require('../assets/images/rewards/red_egg.png'),
  gold_egg: require('../assets/images/rewards/gold_egg.png'),
}

export const searchableRewards = {
  "leg_piece": "Legendary piece",
  "epic_piece": "Epic piece",
  "gold_chest": "Gold chest",
  "silver_chest": "Silver chest",
  "adv_teleport": "Advanced teleport",
  "ap_3": "Action point refill 50",
  "shield_1": "King's Shield 8h",
  "vip_3": "VIP points 500",
  "gems_6": "Gems 10k",
  "gems_2": "Gems 100",
  "speed_chest_3": "Speedup box lv 4",
  "rss_chest_3": "Resource box lv 4",
  "research_speedup_5": "1h Research Speedup",
  "constr_speedup_5": "1h Construction Speedup",
  "troop_speedup_5": "1h Training Speedup",
  "healing_speedup_5": "1h Healing Speedup",
  "gold_egg": "Gold dragon egg",
  "att_boost_2": "Troop attack boost",
  "def_boost_2": "Troop defense boost",
  "speed_boost_2": "Troop marching speed boost",
}

export function mapName(research) {
  switch (research) {
    case "advanced":
      return "Advanced"
    case "battle":
      return "Battle"
    case "production":
      return "Production"
    case "food":
      return "Food";
    case "lumber":
      return "Lumber";
    case "stone":
      return "Stone";
    case "gold":
      return "Gold";
    case "alliance_badge":
      return "Alliance badge";
    case "golden_pillar":
      return "Golden pillar";
    case "castle":
      return "Castle";
    case "academy":
      return "Academy";
    case "treasure_house":
      return "Treasure House";
    case "hospital":
      return "Hospital";
    case "hall_of_alliance":
      return "Hall of Alliance";
    case "storage":
      return "Storage";
    case "trading_post":
      return "Trading Post";
    case "wall":
      return "Wall";
    case "watch_tower":
      return "Watch Tower";
    case "barrack":
      return "Barrack";
    case "farm":
      return "Farm";
    case "lumber_camp":
      return "Lumber Camp";
    case "quarry":
      return "Quarry";
    case "gold_mine":
      return "Gold Mine";
    case "infantry_hp":
      return "Infantry HP 1";
    case "ranged_hp":
      return "Archery HP 1";
    case "cavalry_hp":
      return "Cavalry HP 1";
    case "infantry_def":
      return "Infantry Defense 1";
    case "ranged_def":
      return "Archery Defense 1";
    case "cavalry_def":
      return "Cavalry Defense 1";
    case "infantry_atk":
      return "Infantry Attack 1";
    case "ranged_atk":
      return "Archery Attack 1";
    case "cavalry_atk":
      return "Cavalry Attack 1";
    case "infantry_spd":
      return "Infantry Speed 1";
    case "ranged_spd":
      return "Archery Speed 1";
    case "cavalry_spd":
      return "Cavalry Speed 1";
    case "troops_storage":
      return "Troops load";
    case "warrior":
      return "Warrior (T2)";
    case "longbow_man":
      return "Longbow man (T2)";
    case "horseman":
      return "Horseman (T2)";
    case "infantry_training_amount":
      return "Infantry Training Rate";
    case "ranged_training_amount":
      return "Archery Training Rate";
    case "cavalry_training_amount":
      return "Cavalry Training Rate";
    case "infantry_training_speed":
      return "Infantry Training Speed";
    case "ranged_training_speed":
      return "Archery Training Speed";
    case "cavalry_training_speed":
      return "Cavalry Training Speed";
    case "infantry_training_cost":
      return "Infantry Training Cost";
    case "ranged_training_cost":
      return "Archery Training Cost";
    case "cavalry_training_cost":
      return "Cavalry Training Cost";
    case "march_size":
      return "Marching troop capacity";
    case "march_limit":
      return "Troop dispatch queue";
    case "knight":
      return "Knight (T3)";
    case "ranger":
      return "Ranger (T3)";
    case "heavy_cavalry":
      return "Heavy cavalry (T3)";
    case "troops_spd":
      return "Troops speed";
    case "troops_hp":
      return "Troops HP";
    case "troops_def":
      return "Troops Defense";
    case "troops_atk":
      return "Troops Attack";
    case "hospital_capacity":
      return "Hospital Capacity";
    case "healing_time_reduced":
      return "Speed up healing Time";
    case "guardian":
      return "Guardian (T4)";
    case "crossbow_man":
      return "Crossbow man (T4)";
    case "iron_cavalry":
      return "Iron cavalry (T4)";
    case "rally_attack_amount":
      return "Rally Size";
    case "advanced_infantry_hp":
      return "Infantry HP 2";
    case "advanced_ranged_hp":
      return "Archery HP 2";
    case "advanced_cavalry_hp":
      return "Cavalry HP 2";
    case "advanced_infantry_def":
      return "Infantry Defense 2";
    case "advanced_ranged_def":
      return "Archery Defense 2";
    case "advanced_cavalry_def":
      return "Cavalry Defense 2";
    case "advanced_infantry_atk":
      return "Infantry Attack 2";
    case "advanced_ranged_atk":
      return "Archery Attack 2";
    case "advanced_cavalry_atk":
      return "Cavalry Attack 2";
    case "advanced_infantry_spd":
      return "Infantry Speed 2";
    case "advanced_ranged_spd":
      return "Archery Speed 2";
    case "advanced_cavalry_spd":
      return "Cavalry Speed 2";
    case "crusader":
      return "Crusader (T5)";
    case "sniper":
      return "Sniper (T5)";
    case "dragoon":
      return "Dragoon (T5)";
    case "food_production":
      return "Food Production 1";
    case "wood_production":
      return "Lumber Production 1";
    case "stone_production":
      return "Stone Production 1";
    case "gold_production":
      return "Gold Production 1";
    case "food_capacity":
      return "Food Capacity 1";
    case "wood_capacity":
      return "Lumber Capacity 1";
    case "stone_capacity":
      return "Stone Capacity 1";
    case "gold_capacity":
      return "Gold Capacity 1";
    case "food_gathering_speed":
      return "Food Gathering Speed 1";
    case "wood_gathering_speed":
      return "Lumber Gathering Speed 1";
    case "stone_gathering_speed":
      return "Stone Gathering Speed 1";
    case "gold_gathering_speed":
      return "Gold Gathering Speed 1";
    case "crystal_gathering_speed":
      return "Crystal Gathering Speed 1";
    case "infantry_storage":
      return "Infantry Storage";
    case "ranged_storage":
      return "Archery Storage";
    case "cavalry_storage":
      return "Cavalry Storage";
    case "research_speed":
      return "Research Speed 1";
    case "construction_speed":
      return "Construction Speed 1";
    case "resource_protect":
      return "Resource Protect";
    case "advanced_food_production":
      return "Food Production 2";
    case "advanced_wood_production":
      return "Lumber Production 2";
    case "advanced_stone_production":
      return "Stone Production 2";
    case "advanced_gold_production":
      return "Gold Production 2";
    case "advanced_food_capacity":
      return "Food Capacity 2";
    case "advanced_wood_capacity":
      return "Lumber Capacity 2";
    case "advanced_stone_capacity":
      return "Stone Capacity 2";
    case "advanced_gold_capacity":
      return "Gold Capacity 2";
    case "advanced_research_speed":
      return "Research Speed 2";
    case "advanced_construction_speed":
      return "Construction Speed 2";
    case "advanced_food_gathering_speed":
      return "Food Gathering Speed 2";
    case "advanced_wood_gathering_speed":
      return "Lumber Gathering Speed 2";
    case "advanced_stone_gathering_speed":
      return "Stone Gathering Speed 2";
    case "advanced_gold_gathering_speed":
      return "Gold Gathering Speed 2";
    case "advanced_crystal_gathering_speed":
      return "Crystal Gathering Speed 2";
    case "resource_production":
      return "Resource Production";
    case "infantry_hp_against_archer":
      return "Infantry HP against archer";
    case "infantry_def_against_archer":
      return "Infantry DEFENSE against archer";
    case "infantry_atk_against_archer":
      return "Infantry ATTACK against archer";
    case "archer_hp_against_cavalry":
      return "Archer HP against cavalry";
    case "archer_def_against_cavalry":
      return "Archer DEFENSE against cavalry";
    case "archer_atk_against_cavalry":
      return "Archer ATTACK against cavalry";
    case "cavalry_hp_against_infantry":
      return "Cavalry HP against infantry";
    case "cavalry_def_against_infantry":
      return "Cavalry DEFENSE against infantry";
    case "cavalry_atk_against_infantry":
      return "Cavalry ATTACK against infantry";
    case "resource_capacity":
      return "Resource Capacity";
    case "castle_defending_infantrys_hp":
      return "Infantry's HP when defending castle";
    case "castle_defending_infantrys_def":
      return "Infantry's DEFENSE when defending castle";
    case "castle_defending_infantrys_atk":
      return "Infantry's ATTACK when defending castle";
    case "castle_defending_archers_hp":
      return "Archer's HP when defending castle";
    case "castle_defending_archers_def":
      return "Archer's DEFENSE when defending castle";
    case "castle_defending_archers_atk":
      return "Archer's ATTACK when defending castle";
    case "castle_defending_cavalrys_hp":
      return "Cavalry's HP when defending castle";
    case "castle_defending_cavalrys_def":
      return "Cavalry's DEFENSE when defending castle";
    case "castle_defending_cavalrys_atk":
      return "Cavalry's ATTACK when defending castle";
    /*case "resource_protect":
        return "Resource Protect";*/
    case "infantrys_hp_when_composed_of_infantry_only":
      return "Infantry's HP when composed of Infantry only";
    case "infantrys_def_when_composed_of_infantry_only":
      return "Infantry's DEFENSE when composed of Infantry only";
    case "infantrys_atk_when_composed_of_infantry_only":
      return "Infantry's ATTACK when composed of Infantry only";
    case "archers_hp_when_composed_of_archer_only":
      return "Archer's HP when composed of Archer only";
    case "archers_def_when_composed_of_archer_only":
      return "Archer's DEFENSE when composed of Archer only";
    case "archers_atk_when_composed_of_archer_only":
      return "Archer's ATTACK when composed of Archer only";
    case "cavalrys_hp_when_composed_of_cavalry_only":
      return "Cavalry's HP when composed of Cavalry only";
    case "cavalrys_def_when_composed_of_cavalry_only":
      return "Cavalry's DEFENSE when composed of Cavalry only";
    case "cavalrys_atk_when_composed_of_cavalry_only":
      return "Cavalry's ATTACK when composed of Cavalry only";
    case "troop_speed_when_participating_a_rally":
      return "Troop speed when participating a rally";
    case "infantrys_hp_when_participating_a_rally":
      return "Infantry's HP when participating a rally";
    case "infantrys_def_when_participating_a_rally":
      return "Infantry's DEFENSE when participating a rally";
    case "infantrys_atk_when_participating_a_rally":
      return "Infantry's ATTACK when participating a rally";
    case "archers_hp_when_participating_a_rally":
      return "Archer's HP when participating a rally";
    case "archers_def_when_participating_a_rally":
      return "Archer's DEFENSE when participating a rally";
    case "archers_atk_when_participating_a_rally":
      return "Archer's ATTACK when participating a rally";
    case "cavalrys_hp_when_participating_a_rally":
      return "Cavalry's HP when participating a rally";
    case "cavalrys_def_when_participating_a_rally":
      return "Cavalry's DEFENSE when participating a rally";
    case "cavalrys_atk_when_participating_a_rally":
      return "Cavalry's ATTACK when participating a rally";
    case "cavalry":
      return "Cavalry"
    case "infantry":
      return "Infantry"
    case "archer":
      return "Archer"
    default:
      return "ERROR: NOSTRING";
  }
}