package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.PlaceSimple;
import com.spajalice.ProjektSpajalice.Services.PlaceSimpleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/places")
public class PlaceSimpleController {
    @Autowired
    private PlaceSimpleService placeSimpleService;

    @GetMapping("/names")
    public List<String> getAllPlaceSimpleNames() {
        return placeSimpleService.getAllPlaceSimple().stream().map(PlaceSimple::getName).collect(Collectors.toList());
    }
}
