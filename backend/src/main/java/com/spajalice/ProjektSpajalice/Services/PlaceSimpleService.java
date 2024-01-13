package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Repository.PlaceSimpleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spajalice.ProjektSpajalice.Model.PlaceSimple;

import java.util.List;

@Service
public class PlaceSimpleService {
    @Autowired

    private PlaceSimpleRepository placeSimpleRepository;

    public List<PlaceSimple> getAllPlaceSimple() {
        return placeSimpleRepository.findAll();
    }
}
