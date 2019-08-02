mod utils;

pub mod ecs;

extern crate rand;

use rand::Rng;



use wasm_bindgen::prelude::*;
use crate::ecs::entities::entity::Entity;
use crate::ecs::entities::entity_manager::EntityManager;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;



#[wasm_bindgen]
pub struct World {
    entity_manager : EntityManager,
}

#[wasm_bindgen]

impl World {

    pub fn entities(&self) -> *const Entity {
        self.entity_manager.entities_ptr()
    }

    pub fn new( entity_count:u16) -> World {


        World {
         entity_manager:EntityManager::new(entity_count)
        }
        
    }

    pub fn tick(&mut self){
        let mut next = self.entity_manager.entities.clone();

        for mut entity in &mut next{

            entity.pos_x+=entity.vel_x;
            entity.pos_y+=entity.vel_y;

            if entity.pos_x < 0{
                entity.pos_x = 800

            } else if entity.pos_x > 800{
                entity.pos_x = 0
                
            }

            if entity.pos_y < 0{
                entity.pos_y = 600

            } else if entity.pos_y > 600{
                entity.pos_y = 0
                
            }

        }
        self.entity_manager.entities = next;
    
    }
}