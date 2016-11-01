<% if (unitTestType==="gtest"){%>
#include "gtest/gtest.h"
<% } else if (unitTestType==="catch"){%>
#include "catch.hpp"
<% } %>
#include <gsl/gsl_rng.h>

<% if (unitTestType==="gtest"){%>
TEST(test_gsl, test_gsl)
<% } else if (unitTestType==="catch"){%>
TEST_CASE("test_gsl", "[test_gsl]")
<% } %>
{
    const gsl_rng_type * T;
    gsl_rng * r;

    gsl_rng_env_setup();

    T = gsl_rng_default;
    r = gsl_rng_alloc (T);

    for (int i = 0; i < 10; i++) {
        double u = gsl_rng_uniform (r);
        printf ("%.5f\n", u);
    }
    gsl_rng_free (r);
}