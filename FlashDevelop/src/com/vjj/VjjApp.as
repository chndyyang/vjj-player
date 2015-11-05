package com.vjj{
    
    import flash.display.Sprite;
	
    public class VjjApp extends Sprite{
        
        private var _uiView:VjjView;
        private var _model:VjjModel;
        
        public function VjjApp(){
            
            _model = VjjModel.getInstance()

            _uiView = new VjjView();
            addChild(_uiView);

        }
        
        public function get model():VjjModel{
            return _model;
        }
        
    }
}