cmake_minimum_required(VERSION 2.8.8)
project(fakeit_builder CXX)
include(ExternalProject)
find_package(Git REQUIRED)

ExternalProject_Add(
    fakeit
    PREFIX ${CMAKE_BINARY_DIR}/fakeit
    GIT_REPOSITORY https://github.com/eranpeer/FakeIt
    TIMEOUT 10
    UPDATE_COMMAND ${GIT_EXECUTABLE} pull
    CONFIGURE_COMMAND ""
    BUILD_COMMAND ""
    INSTALL_COMMAND ""
    LOG_DOWNLOAD ON
   )

# Expose required variable (FAKEIT_INCLUDE_DIR) to parent scope
ExternalProject_Get_Property(fakeit source_dir)
set(FAKEIT_INCLUDE_DIR ${source_dir}/include CACHE INTERNAL "Path to include folder for Fakeit")
set(FAKEIT_CATCH_CONFIG_DIR ${source_dir}/config/catch CACHE INTERNAL "Path to include folder for Fakeit")