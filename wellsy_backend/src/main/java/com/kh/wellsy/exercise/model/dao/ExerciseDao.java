package com.kh.wellsy.exercise.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.kh.wellsy.exercise.model.vo.Exercise;

public interface ExerciseDao
                extends JpaRepository<Exercise, Integer> {

        Optional<Exercise> findByExerciseName(
                        String exerciseName);
}