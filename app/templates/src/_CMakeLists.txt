
add_executable(<%= appname %> main.cpp)

target_link_libraries(<%= appname %> mpi)

target_compile_features(<%= appname %> PRIVATE cxx_range_for)
