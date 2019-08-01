mod utils;

extern crate rand;

use rand::Rng;


use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(Clone)]

pub struct Entity {
    pos_x: i32,
    pos_y: i32,
    
    vel_x: i32,
    vel_y: i32,

    angle: i32,

    img: i16,

}

fn build_entity(pos_x:i32,pos_y:i32,vel_x:i32,vel_y:i32,angle:i32,img:i16)-> Entity {
    Entity{
        pos_x,
        pos_y,
        vel_x,
        vel_y,
        angle,
        img,
    }
}



#[wasm_bindgen]

//#[repr(u8)]
//#[derive(Clone, Copy, Debug, PartialEq, Eq)]

pub fn return_entity()->Entity{

    let mut rng = rand::thread_rng();

    let pos_x=rng.gen_range(50,750);
    let pos_y=rng.gen_range(50,550);
    let vel_x=rng.gen_range(0,8)-4;
    let vel_y=rng.gen_range(0,8)-4;
    let angle=0;
    let img=0;

    let entity_one = build_entity(pos_x, pos_y, vel_x, vel_y, angle, img);

    entity_one
}

#[wasm_bindgen]
pub struct Display {
    entities: Vec<Entity>,
}

#[wasm_bindgen]
impl Display {

    pub fn entities(&self) -> *const Entity {
        self.entities.as_ptr()
    }

    pub fn new( entity_count:u16) -> Display {

        let entities = (0..entity_count)
            .map(|x| {
                return_entity()
            })
            .collect();

        Display {
            entities,
        }
    }

    pub fn tick(&mut self){
        let mut next = self.entities.clone();
     //   let mut rng = rand::thread_rng();

        for mut entity in &mut next{

            // let rngx=rng.gen_range(0,100);
            // let rngy=rng.gen_range(0,100);

            // if rngx < 30 {
            entity.pos_x+=entity.vel_x;


            // } else if rngx < 60{
            // entity.pos_x-=entity.vel_x;


            // }

            // if rngy < 30 {
            entity.pos_y+=entity.vel_y;


            // } else if rngy < 60{
            // entity.pos_y-=entity.vel_y;


            // }
        }
        self.entities = next;
    
    }
}