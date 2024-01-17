package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.EventType;
import com.spajalice.ProjektSpajalice.Model.PlaceSimple;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlaceTypeRequest {

    private EventType type;
    private PlaceSimple place;

}
